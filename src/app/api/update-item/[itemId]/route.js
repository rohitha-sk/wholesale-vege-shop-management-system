import clientPromise from '@/app/lib/mongodb';

export async function PATCH(req, context) {
  try {
    // Await `params` to safely extract `itemId`
    const { itemId } = context.params;

    // Ensure itemId is a valid number
    if (!itemId || isNaN(Number(itemId))) {
      return new Response(
        JSON.stringify({ error: 'Invalid item ID format' }),
        { status: 400 }
      );
    }

    // Parse the request body for updates
    const body = await req.json();
    const validFields = ['name', 'price', 'stockQty', 'availability'];
    const updateData = {};

    // Filter and process fields for update
    validFields.forEach((field) => {
      if (body[field] !== undefined) {
        updateData[field] =
          field === 'price'
            ? parseFloat(body[field]).toFixed(2) // Ensure price has two decimal places
            : body[field];
      }
    });

    // Check if there are valid fields to update
    if (Object.keys(updateData).length === 0) {
      return new Response(
        JSON.stringify({ error: 'No valid fields provided for update' }),
        { status: 400 }
      );
    }

    // Convert itemId to a number for querying
    const numericItemId = Number(itemId);

    // Connect to the database
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('stockinventories');

    // Update the document by itemId
    const result = await collection.updateOne(
      { itemId: numericItemId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ error: 'Item not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ message: 'Item updated successfully', updatedFields: updateData }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating stock inventory:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to update item', details: error.message }),
      { status: 500 }
    );
  }
}
