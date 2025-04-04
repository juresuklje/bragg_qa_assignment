import { clearPlayerTable, insertTestData, closeDbConnection, getDbPool } from '../helpers/db';

// Time to wait for Docker container and database to be ready (ms)
const SETUP_TIMEOUT = 30000;

describe('Player Database Integration Tests', () => {
  // Get database pool
  const pool = getDbPool();

  // Setup: clear table and insert test data
  beforeAll(async () => {
    try {
      await clearPlayerTable();
      await insertTestData(30); // Insert 30 test records
    } catch (error) {
      console.error('Test setup failed:', error);
      throw error;
    }
  }, SETUP_TIMEOUT);

  // Cleanup: close database connection
  afterAll(async () => {
    await closeDbConnection();
  });

  describe('Basic Queries', () => {
    it('should return all player records', async () => {
      const result = await pool.query('SELECT * FROM player');
      expect(result.rows.length).toBe(30);
    });

    it('should find a player by email', async () => {
      const result = await pool.query(
        'SELECT * FROM player WHERE player_email = $1',
        ['player1@example.com']
      );

      expect(result.rows.length).toBe(1);
      expect(result.rows[0].player_name).toBe('TestName1');
    });
  });

  describe('Time-Based Queries', () => {
    it('should log the number of withdrawals made by a player on the current day', async () => {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0); // Set to start of the day

      // Find a player with withdrawals on the current day
      const playerResult = await pool.query(
        `SELECT player_id
         FROM player
         WHERE DATE_TRUNC('day', withdrawal_creation_date) = $1
         LIMIT 1`,
        [currentDate]
      );

      if (playerResult.rows.length === 0) {
        console.log('No players found with withdrawals on the current day');
        return; // Exit the test if no players are found
      }

      const playerId = playerResult.rows[0].player_id;

      const result = await pool.query(
        `SELECT COUNT(*)
         FROM player
         WHERE player_id = $1
         AND DATE_TRUNC('day', withdrawal_creation_date) = $2`,
        [playerId, currentDate]
      );

      const count = parseInt(result.rows[0].count, 10);

      // Log the count of withdrawals
      console.log(`Number of withdrawals made by player ${playerId} on the current day: ${count}`);
    });

    it('should log withdrawal IDs made by a player yesterday', async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0); // Set to start of yesterday

      // Find a player with withdrawals yesterday
      const playerResult = await pool.query(
        `SELECT player_id
         FROM player
         WHERE DATE_TRUNC('day', withdrawal_creation_date) = $1
         LIMIT 1`,
        [yesterday]
      );

      if (playerResult.rows.length === 0) {
        console.log('No players found with withdrawals yesterday');
        return; // Exit the test if no players are found
      }

      const playerId = playerResult.rows[0].player_id;

      const result = await pool.query(
        `SELECT withdrawal_id
         FROM player
         WHERE player_id = $1
         AND DATE_TRUNC('day', withdrawal_creation_date) = $2`,
        [playerId, yesterday]
      );

      // Log the withdrawal IDs
      if (result.rows.length > 0) {
        console.log(`Withdrawal IDs made by player ${playerId} yesterday:`);
        result.rows.forEach(row => {
          console.log(row.withdrawal_id);
        });
      } else {
        console.log(`No withdrawals found for player ${playerId} yesterday`);
      }
    });

    it('should find withdrawals created in the last 3 days', async () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      const result = await pool.query(
        'SELECT * FROM player WHERE withdrawal_creation_date >= $1',
        [threeDaysAgo]
      );

      // We expect some records in the last 3 days, but not all 30
      expect(result.rows.length).toBeGreaterThan(0);
      expect(result.rows.length).toBeLessThan(30);
    });

    it('should calculate daily withdrawal totals', async () => {
      const result = await pool.query(
        `SELECT 
          DATE_TRUNC('day', withdrawal_creation_date) as day,
          COUNT(*) as transactions,
          SUM(withdrawal_amount) as total_amount
        FROM player
        GROUP BY day
        ORDER BY day DESC`
      );

      expect(result.rows.length).toBeGreaterThan(0);

      // Verify result structure
      const firstDay = result.rows[0];
      expect(firstDay).toHaveProperty('day');
      expect(firstDay).toHaveProperty('transactions');
      expect(firstDay).toHaveProperty('total_amount');
      expect(parseFloat(firstDay.total_amount)).toBeGreaterThan(0);
    });
  });

});
