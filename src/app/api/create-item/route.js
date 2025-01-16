import clientPromise from '../../lib/mongodb';
import mongoose from 'mongoose';
import StockInventory from '../../models/StockInventory';

export async function POST(req) {
  try {
    // Ensure MongoDB connection
    const client = await clientPromise;

    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    // Parse the request body
    const body = await req.json();
    const { name, price, stockQty, availability } = body;

    // Validate the required fields
    if (!name || !price || !stockQty) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: name, price, or stockQty' }),
        { status: 400 }
      );
    }
    const decimalPrice = mongoose.Types.Decimal128.fromString(price.toFixed(2));
    // Create a new stock inventory document
    const stockInventory = new StockInventory({
      name,
      price: decimalPrice,
      stockQty,
      availability: availability ?? true, // Use default if not provided
    });

    // Save to the database
    const savedDocument = await stockInventory.save();

    // Return success response
    return new Response(JSON.stringify(savedDocument), { status: 201 });
  } catch (error) {
    console.error('Error inserting stock inventory:', error.message);
    return new Response(
      JSON.stringify({ error: 'Failed to insert data', details: error.message }),
      { status: 500 }
    );
  }
}
