import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export default sql;

// Helper function to test connection
export async function testConnection() {
  try {
    await sql`SELECT NOW()`;
    return true;
  } catch (error) {
    console.error('Neon connection failed:', error);
    return false;
  }
}