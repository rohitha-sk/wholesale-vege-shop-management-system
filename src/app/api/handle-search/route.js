import clientPromise from "@/app/lib/mongodb"; // Adjust the path to your MongoDB utility

// Handler for the GET method
export async function GET(req) {
  // Extract the search query from the request URL
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search');

  if (!search) {
    return new Response(JSON.stringify({ message: 'Search query is required' }), { status: 400 });
  }

  try {
    // Wait for the database connection to be ready
    const client = await clientPromise;
    const db = client.db(); // Get the database instance
    const collection = db.collection('stockinventories'); // Reference to your collection

    // Perform the search with the provided search term
    const searchResults = await collection
      .find({ name: { $regex: search, $options: 'i' } }) // Case-insensitive regex search
      .toArray(); // Convert the cursor to an array

    // Return the filtered data as a response
    return new Response(JSON.stringify(searchResults), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error searching inventory:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
