# BRAGG QA Assignment

This repository demonstrates a structured approach to testing APIs and databases using Vitest, with both integration and end-to-end (e2e) tests.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Docker](https://www.docker.com/) and Docker Compose
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Repository Structure

```
bragg_qa_assignment/
├── node_modules/                         # Dependencies (generated)
├── tests/                                # All test files
│   ├── e2e/                              # End-to-end tests
│   │   └── assignment.test.ts            # Assignement e2e tests
│   ├── helpers/                          # Helper functions for tests
│   │   ├── api.ts                        # API fetching utilities
│   │   ├── db.ts                         # Database utilities
│   │   └── endpoints.ts                  # API endpoint definitions
│   ├── integration/                      # Integration tests
│   │   └── db.test.ts                    # Database integration tests
|   └── test_cases/                       # Test cases for API and UI
|       ├── test-cases-withdrawal-api.md  # Test cases for API withdrawal tests
|       └── test-cases-withdrawal-ui.md   # Test cases for UI withdrawal tests
├── .env                                  # Environment variables (create from .example.env)
├── .example.env                          # Example environment variables
├── .gitignore                            # Git ignore file
├── docker-compose.yml                    # Docker Compose configuration
├── init.sql                              # Database initialization script
├── package-lock.json                     # Dependency lock file
├── package.json                          # Project configuration
├── README.md                             # Project documentation
├── tsconfig.json                         # TypeScript configuration
└── vitest.config.ts                      # Vitest configuration
```

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/juresuklje/bragg_qa_assignment.git
   cd bragg_qa_assignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.example.env`:
   ```bash
   cp .example.env .env
   ```
   Then edit `.env` to set your environment variables, especially `API_BASE_URL`.

4. Start the PostgreSQL database:
   ```bash
   docker compose up -d
   ```
   This will:
   - Start a PostgreSQL container
   - Create the `player_database` with the `player` table
   - Initialize the necessary schema from `init.sql`

## Available Commands

The following npm scripts are available:

- **Run integration tests**:
  ```bash
  npm run test:integration
  ```
  This runs tests in the `tests/integration` directory, which test database queries directly.

- **Run end-to-end tests**:
  ```bash
  npm run test:e2e
  ```
  This runs tests in the `tests/e2e` directory, which test API endpoints.

- **Run all tests**:
  ```bash
  npm run test:all
  ```
  This runs all tests in the `tests` directory.

## Database Details

The PostgreSQL database is configured with the following connection details:

- **Host**: localhost
- **Port**: 5432
- **Database**: player_database
- **Username**: postgres
- **Password**: postgres

The database contains a `player` table with the following structure:
- `id` (Serial Primary Key)
- `player_id` (VARCHAR)
- `player_name` (VARCHAR)
- `player_surname` (VARCHAR)
- `player_email` (VARCHAR, Unique)
- `player_phone_number` (VARCHAR)
- `withdrawal_id` (VARCHAR)
- `withdrawal_creation_date` (TIMESTAMP)
- `withdrawal_status_update_date` (TIMESTAMP)
- `withdrawal_amount` (DECIMAL)
- `withdrawal_currency` (VARCHAR)

## Helper Functions

The repository includes several helper functions:

### Database Helpers (`tests/helpers/db.ts`)

- `clearPlayerTable()`: Clears all data from the player table
- `insertTestData(numRecords)`: Inserts a specified number of test records with timestamps spread across a week
- `closeDbConnection()`: Closes the database connection pool
- `getDbPool()`: Returns the database connection pool instance

### API Helpers (`tests/helpers/api.ts`)

- `fetchAPI(endpoint, options)`: Fetches data from the API with proper error handling

## Writing Tests

### Integration Tests

Database integration tests use the database helpers to query the PostgreSQL database directly:

```typescript
import { describe, it, expect } from 'vitest';
import { getDbPool } from '../helpers/db';

describe('My Integration Test', () => {
  const pool = getDbPool();
  
  it('should query the database', async () => {
    const result = await pool.query('SELECT * FROM player LIMIT 1');
    expect(result.rows.length).toBe(1);
  });
});
```

### E2E Tests

E2E tests use the API helpers to test endpoints:

```typescript
import { describe, it, expect } from 'vitest';
import { fetchAPI } from '../helpers/api';

describe('My E2E Test', () => {
  it('should call an API endpoint', async () => {
    const result = await fetchAPI('/endpoint');
    expect(result).toBeDefined();
  });
});
```

### Test Cases

#### 1. Title of the Test Case

**Description:** Provide helpful information regarding the purpose and scope of this test case.

**Precondition:** Describe any conditions that must be met for the test case to be successfully executed.

**Steps:**
1. Detail the first step needed to execute the test.
2. Continue with subsequent steps required to complete the test.

**Input:** Specify any particular input data required for this test case.

**Expected Result:** Describe the expected outcome or behavior if the test case is successfully executed.


## Troubleshooting

- **Database Connection Issues**: Make sure Docker is running and the container is up with `docker compose ps`
- **Test Failures**: Check that your `.env` file contains the correct API URL
- **Database Reset**: To reset the database, run `docker compose down -v` and then `docker compose up -d`