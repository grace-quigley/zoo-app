import { db } from "@vercel/postgres";

const client = await db.connect();

async function listItems() {
	const data = await client.sql`
    SELECT items.name, items.quantity, locations.name as location_name
    FROM items
    JOIN locations ON items.location_id = locations.id
  `;

	return data.rows;
}

export async function GET() {
  try {
  	return Response.json(await listItems());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}
