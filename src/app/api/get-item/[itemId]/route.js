import clientPromise from "@/app/lib/mongodb";

export async function GET(req, { params }) {
  try {
    // Extract the itemId from the params object
    const { itemId } = params;

    // Log params for debugging
    console.log("Received params:", params);

    // Validate that itemId is a number
    if (!itemId || isNaN(Number(itemId))) {
      return new Response(
        JSON.stringify({ error: "Invalid item ID format" }),
        { status: 400 }
      );
    }

    // Convert itemId to a number for querying
    const numericItemId = Number(itemId);

    // Connect to the database
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("stockinventories");

    // Fetch the item by itemId
    const item = await collection.findOne({ itemId: numericItemId });

    // Handle case where item is not found
    if (!item) {
      return new Response(
        JSON.stringify({ error: "Item not found" }),
        { status: 404 }
      );
    }

    // Return the item data
    return new Response(JSON.stringify(item), { status: 200 });
  } catch (error) {
    console.error("Error fetching stock inventory:", error.message);
    return new Response(
      JSON.stringify({ error: "Failed to fetch data", details: error.message }),
      { status: 500 }
    );
  }
}
