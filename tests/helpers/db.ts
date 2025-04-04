import { Pool } from 'pg';

// Database connection configuration
const dbConfig = {
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'player_database'
};

// Create a connection pool
const pool = new Pool(dbConfig);

/**
 * Clear all data from the player table
 */
export const clearPlayerTable = async (): Promise<void> => {
  try {
    await pool.query('TRUNCATE TABLE player RESTART IDENTITY CASCADE');
    console.log('Player table cleared');
  } catch (error) {
    console.error('Error clearing player table:', error);
    throw error;
  }
};

/**
 * Generate a date that's a specific number of days from now
 */
const generateDate = (daysFromNow: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date;
};

/**
 * Insert test data with timestamps spread across a week
 */
export const insertTestData = async (numRecords: number = 20): Promise<void> => {
  try {
    // Generate an array of player data
    const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];

    for (let i = 0; i < numRecords; i++) {
      // Calculate dates - spread records over the past week
      const creationDaysAgo = Math.floor(Math.random() * 7); // 0-6 days ago
      const updateDaysAgo = Math.floor(Math.random() * creationDaysAgo); // More recent than creation

      const creationDate = generateDate(-creationDaysAgo);
      const updateDate = generateDate(-updateDaysAgo);

      // Generate random withdrawal amount between $10 and $1000
      const amount = parseFloat((Math.random() * 990 + 10).toFixed(2));

      // Random currency
      const currency = currencies[Math.floor(Math.random() * currencies.length)];

      await pool.query(
        `INSERT INTO player (
          player_id, 
          player_name, 
          player_surname, 
          player_email, 
          player_phone_number,
          withdrawal_id,
          withdrawal_creation_date,
          withdrawal_status_update_date,
          withdrawal_amount,
          withdrawal_currency
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          `P${100000 + i}`, // player_id
          `TestName${i}`,   // player_name
          `TestSurname${i}`, // player_surname
          `player${i}@example.com`, // player_email
          `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`, // player_phone_number
          `W${200000 + i}`, // withdrawal_id
          creationDate, // withdrawal_creation_date
          updateDate,   // withdrawal_status_update_date
          amount,       // withdrawal_amount
          currency      // withdrawal_currency
        ]
      );
    }

    console.log(`${numRecords} test records inserted`);
  } catch (error) {
    console.error('Error inserting test data:', error);
    throw error;
  }
};

/**
 * Close database connection pool
 */
export const closeDbConnection = async (): Promise<void> => {
  await pool.end();
  console.log('Database connection closed');
};

/**
 * Get the database connection pool
 */
export const getDbPool = (): Pool => {
  return pool;
};
