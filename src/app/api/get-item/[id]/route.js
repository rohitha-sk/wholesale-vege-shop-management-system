import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req, { params }) {
  try {
    // Extract the id from the params object
    const { id } = await params;

    // Ensure valid ObjectId format
    if (!ObjectId.isValid(id)) {
      return new Response(
        JSON.stringify({ error: 'Invalid item ID format' }),
        { status: 400 }
      );
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('stockinventories'); // Use your actual collection name

    // Fetch the item from the database
    const item = await collection.findOne({ _id: new ObjectId(id) });

    // If item not found
    if (!item) {
      return new Response(
        JSON.stringify({ error: 'Item not found' }),
        { status: 404 }
      );
    }

    // Return the item data
    return new Response(JSON.stringify(item), { status: 200 });
  } catch (error) {
    console.error('Error fetching stock inventory:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch data', details: error.message }),
      { status: 500 }
    );
  }
}
