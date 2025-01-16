import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(req, { params }) {
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

    // Delete the item from the database
    const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });

    // If no document was deleted
    if (deleteResult.deletedCount === 0) {
      return new Response(
        JSON.stringify({ error: 'Item not found or already deleted' }),
        { status: 404 }
      );
    }

    // Return success response
    return new Response(
      JSON.stringify({ message: 'Item deleted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting stock inventory:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to delete item', details: error.message }),
      { status: 500 }
    );
  }
}
