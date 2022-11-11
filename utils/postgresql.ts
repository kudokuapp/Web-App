import pg from 'pg';

const Pool = pg.Pool;

// Instantiate a connection to Kudoku Postgresql on digital ocean
const pool = new Pool({
  user: process.env.PGUSER as string,
  password: process.env.PGPASSWORD as string,
  host: process.env.PGHOST as string,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE as string,
  ssl: {
    rejectUnauthorized: false,
    ca: process.env.PGCACERT as string,
  },
});

export default pool;
