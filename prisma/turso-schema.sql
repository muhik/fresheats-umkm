-- Transaction table
CREATE TABLE IF NOT EXISTS Transaction (
  id TEXT PRIMARY KEY,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  total REAL NOT NULL
);

-- TransactionItem table
CREATE TABLE IF NOT EXISTS TransactionItem (
  id TEXT PRIMARY KEY,
  transactionId TEXT NOT NULL,
  name TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price REAL NOT NULL,
  subtotal REAL NOT NULL,
  FOREIGN KEY (transactionId) REFERENCES Transaction(id)
);
