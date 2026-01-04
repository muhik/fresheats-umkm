// Script to push schema to Turso
const { createClient } = require('@libsql/client');

const client = createClient({
    url: 'libsql://fresheats-muhik.aws-ap-northeast-1.turso.io',
    authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Njc0OTUxNzAsImlkIjoiNTBlMTYxODktZWUyYi00ZTQzLWFlYzItNTNjMWJkZDJjYmIyIiwicmlkIjoiNGQyZTE1ZDEtZjVkNi00ZTYzLTliMzUtMjhmZDM1Yzk5YTlhIn0.zZz6kL11Qdh-99MQaiDqL1vDhAypVsgAWlqAdgUSDjmVSlGr9Scm672oh7zTrw_IWbkoIIsL7QSj-WyElUPRCg',
});

async function pushSchema() {
    try {
        console.log('Creating Transaction table...');
        await client.execute(`
      CREATE TABLE IF NOT EXISTS "Transaction" (
        id TEXT PRIMARY KEY,
        date DATETIME DEFAULT CURRENT_TIMESTAMP,
        total REAL NOT NULL
      )
    `);

        console.log('Creating TransactionItem table...');
        await client.execute(`
      CREATE TABLE IF NOT EXISTS "TransactionItem" (
        id TEXT PRIMARY KEY,
        transactionId TEXT NOT NULL,
        name TEXT NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        subtotal REAL NOT NULL,
        FOREIGN KEY (transactionId) REFERENCES "Transaction"(id)
      )
    `);

        console.log('✅ Schema pushed to Turso successfully!');

        // List tables to verify
        const result = await client.execute("SELECT name FROM sqlite_master WHERE type='table'");
        console.log('Tables in database:', result.rows);

    } catch (error) {
        console.error('Error pushing schema:', error);
    }
}

pushSchema();
