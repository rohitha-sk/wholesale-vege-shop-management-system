import clientPromise from '../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('vege-wholesale-db'); // You can specify your database name here

    // Ping the database to confirm connection
    await db.command({ ping: 1 });

    return new Response(
      JSON.stringify({ message: 'Successfully connected to MongoDB!' }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Failed to connect to MongoDB', details: error.message }),
      { status: 500 }
    );
  }
}
