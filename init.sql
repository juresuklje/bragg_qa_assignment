-- Connect to the database
\c player_database;

-- Create the player table
CREATE TABLE IF NOT EXISTS player (
    id SERIAL PRIMARY KEY,
    player_id VARCHAR(255) NOT NULL,
    player_name VARCHAR(255) NOT NULL,
    player_surname VARCHAR(255) NOT NULL,
    player_email VARCHAR(255) UNIQUE NOT NULL,
    player_phone_number VARCHAR(50),
    withdrawal_id VARCHAR(255),
    withdrawal_creation_date TIMESTAMP,
    withdrawal_status_update_date TIMESTAMP,
    withdrawal_amount DECIMAL(15, 2),
    withdrawal_currency VARCHAR(3)
);

-- Permissions
ALTER TABLE player OWNER TO postgres;
GRANT ALL PRIVILEGES ON TABLE player TO postgres;