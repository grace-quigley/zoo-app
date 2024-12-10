import { db, sql } from "@vercel/postgres";
import { ListItems, ListsTable } from "../lib/definitions";

const client = await db.connect();

async function listItems() {
  try {
    const data = await sql<ListItems>`
      SELECT 
    inventory_lists.name,
    inventory_lists.id,
    items.name as item_name,
    items.id as item_id,
    locations.name as location_name,
    locations.id as location_id
    FROM inventory_lists
    JOIN items ON items.id::text = ANY(inventory_lists.item_ids)
    JOIN locations on locations.id = items.location_id
    `;

    const item = data.rows;
    return item;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lists.');
  }
}

export async function GET() {
  try {
  	return Response.json(await listItems());
  } catch (error) {
  	return Response.json({ error }, { status: 500 });
  }
}