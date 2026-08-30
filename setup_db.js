import fs from 'fs';
import pg from 'pg';

const { Client } = pg;

// Password is URL encoded: 93421584496@Mu -> 93421584496%40Mu
const connectionString = 'postgresql://postgres:93421584496%40Mu@db.preygycagioyfkdprhuw.supabase.co:5432/postgres';

const client = new Client({
  connectionString,
});

async function setupDatabase() {
  try {
    await client.connect();
    console.log('Connected to Supabase PostgreSQL database.');

    const schemaPath = new URL('./supabase_schema.sql', import.meta.url).pathname.replace(/^\/([a-zA-Z]:)/, '$1');
    const sql = fs.readFileSync('supabase_schema.sql', 'utf8');
    
    console.log('Executing schema script...');
    await client.query(sql);
    
    console.log('Successfully created all tables and storage buckets!');
  } catch (err) {
    console.error('Error executing schema:', err.message);
  } finally {
    await client.end();
  }
}

setupDatabase();
