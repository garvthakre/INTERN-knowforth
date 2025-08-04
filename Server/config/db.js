import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => console.log(' PostgreSQL connected  '))
  .catch((err) => console.error(' PostgreSQL connection error:', err.message));

export default pool;
