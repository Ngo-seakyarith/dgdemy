import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export default sql;

// Helper function to test connection
export async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log('Neon connection successful:', result[0]);
    return true;
  } catch (error) {
    console.error('Neon connection failed:', error);
    return false;
  }
}