import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { locations, items, expenses, users, receipts } from '../lib/placeholder-data';

const client = await db.connect();
async function seedLocations() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS locations (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR NOT NULL,
      description VARCHAR NULL,
      tags VARCHAR
    );
  `;

  const insertedLocations = await Promise.all(
    locations.map(async (location) => {
      const tags = JSON.stringify(location.tags);
      // TODO: tags are going to be a string of ["#tag"] for now, need to parse when retrieving
      return client.sql`
        INSERT INTO locations (id, name, description, tags)
        VALUES (${location.id}, ${location.name}, ${location.description}, ${tags})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedLocations;
}

async function seedItems() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS items (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR NOT NULL,
      description VARCHAR NULL,
      location_id UUID REFERENCES locations(id),
      tags VARCHAR,
      image_url VARCHAR NULL,
      quantity INT NULL
    );
  `;

  const insertedItems = await Promise.all(
    items.map(async (item) => {
      const tags = JSON.stringify(item.tags);
      // TODO: tags are going to be a string of ["#tag"] for now, need to parse when retrieving
      return client.sql`
        INSERT INTO items (id, name, description, location_id, tags, image_url, quantity)
        VALUES (${item.id}, ${item.name}, ${item.description}, ${item.location_id}, 
              ${tags}, ${item.image_url}, ${item.quantity})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedItems;
}

async function seedExpenses() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS exspenses (
      name VARCHAR NOT NULL,
      month VARCHAR NOT NULL,
      exspense INT NOT NULL
    );
  `;

  const insertedExspenses = await Promise.all(
    expenses.map(async (exp) => {
      // TODO: tags are going to be a string of ["#tag"] for now, need to parse when retrieving
      return client.sql`
        INSERT INTO exspenses (name, month, exspense)
        VALUES (${exp.name}, ${exp.month}, ${exp.expense})
      `;
    }),
  );

  return insertedExspenses;
}

async function seedUsers() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        image_url VARCHAR NULL,
        password TEXT NOT NULL
      );
    `;
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
          INSERT INTO users (id, name, email, image_url, password)
          VALUES (${user.id}, ${user.name}, ${user.email}, ${user.image_url}, ${hashedPassword})
          ON CONFLICT (id) DO NOTHING;
        `;
      }),
    );
    return insertedUsers;
  }

async function seedReceipts() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS receipts (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(id),
      amount INT NOT NULL,
      description VARCHAR NOT NULL,
      date DATE NOT NULL
    );
  `;
  const insertedReceipts = await Promise.all(
    receipts.map(
      (receipt) => client.sql`
        INSERT INTO receipts (user_id, amount, description, date)
        VALUES (${receipt.user_id}, ${receipt.amount}, ${receipt.description}, ${receipt.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );
  return insertedReceipts;
}
export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedReceipts();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
