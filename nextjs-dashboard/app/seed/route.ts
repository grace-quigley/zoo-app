import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { locations, items, categories } from '../lib/placeholder-data';

const client = await db.connect();

// async function seedCategories() {
  // await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  // await client.sql`
  //   CREATE TABLE IF NOT EXISTS categories (
  //     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  //     name VARCHAR(255) NOT NULL,
  //     description TEXT,
  //   );
  // `;

//   const insertedCategories = await Promise.all(
//     categories.map(async (category) => {
//       return client.sql`
//         INSERT INTO categories (id, name, description)
//         VALUES (${category.id}, ${category.name}, ${category.description})
//         ON CONFLICT (id) DO NOTHING;
//       `;
//     }),
//   );

//   return insertedCategories;
// }

// async function seedItems() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS items (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       location_id UUID NOT NULL,
//       category_id UUID NOT NULL,
//       description TEXT, 
//       quantity INT,
//       image_url VARCHAR(255)
//     );
//   `;

//   const insertedItems = await Promise.all(
//     items.map(
//       (item) => client.sql`
//         INSERT INTO invoices (id, location_id, category_id, description, quantity, image_url)
//         VALUES (${item.id}, ${item.location_id}, ${item.category_id}, 
//           ${item.description}, ${item.quantity}, ${item.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedItems;
// }

async function seedLocations() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS locations (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT
    );
  `;

  const insertedLocations = await Promise.all(
    locations.map(
      (location) => client.sql`
        INSERT INTO locations (id, name, description)
        VALUES (${location.id}, ${location.name}, ${location.description}})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedLocations;
}

// // async function seedRevenue() {
// //   await client.sql`
// //     CREATE TABLE IF NOT EXISTS revenue (
// //       month VARCHAR(4) NOT NULL UNIQUE,
// //       revenue INT NOT NULL
// //     );
// //   `;

// //   const insertedRevenue = await Promise.all(
// //     revenue.map(
// //       (rev) => client.sql`
// //         INSERT INTO revenue (month, revenue)
// //         VALUES (${rev.month}, ${rev.revenue})
// //         ON CONFLICT (month) DO NOTHING;
// //       `,
// //     ),
// //   );

//   // return insertedRevenue;
// // }

export async function GET() {
  try {
    await client.sql`BEGIN`;
    // await seedCategories();
    await seedLocations();
    // await seedItems();
    // await seedRevenue();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
