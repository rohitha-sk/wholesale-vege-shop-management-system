import clientPromise from "../../lib/mongodb"; // Adjust the path based on your folder structure

export async function GET(req) {
  try {
    // Wait for the MongoDB client connection
    const client = await clientPromise;
    const db = client.db(); // Use the default database defined in the connection string

    // Access the StockInventory collection
    const collection = db.collection("stockinventories");

    // Fetch all documents from the collection
    const stockData = await collection.find({}).toArray();

    // Return the data as JSON
    return new Response(JSON.stringify(stockData), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching stock inventory data:", error);

    // Return error response
    return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
