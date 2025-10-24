-- Active: 1755915185094@@127.0.0.1@5432@personal_expense_tracker
CREATE TABLE users (
  id UUID UNIQUE PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
-- rename user table name column username
ALTER TABLE users RENAME COLUMN name to username;
--  add column crated at into user table 
ALTER Table users ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

CREATE TABLE expenses (
  id UUID UNIQUE PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  amount NUMERIC(10,2),
  category VARCHAR(50),
  type VARCHAR(10) CHECK (type IN ('INCOME', 'EXPENSE')),
  note TEXT,
  is_large BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
