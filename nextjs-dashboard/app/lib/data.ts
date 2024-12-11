import { db, sql } from '@vercel/postgres';
import {
  UserField,
  CustomersTableType,
  TransactionForm,
  TransactionsTable,
  LatestTransactionRaw,
  Expense,
  ItemsTable,
  ItemForm,
  LocationField,
  ListsTable,
  ListItems,
  ListItem,
  ListItemResponse,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchExpenses() {
  try {
    const data = await sql<Expense>`SELECT * FROM expenses`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch expense data.');
  }
}

export async function fetchLatestReceipts() {
  try {
    const data = await sql<LatestTransactionRaw>`
      SELECT receipts.amount, receipts.description, users.name, users.image_url, receipts.id
      FROM receipts
      JOIN users ON receipts.user_id = users.id
      ORDER BY receipts.date DESC
      LIMIT 5`;
    console.log('Data fetch completed after 3 seconds.');

    const latestReceipts = data.rows.map((receipt) => ({
      ...receipt,
      amount: formatCurrency(receipt.amount),
    }));
    return latestReceipts;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest receipts.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredReceipts(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const receipts = await sql<TransactionsTable>`
      SELECT
        receipts.id,
        receipts.amount,
        receipts.date,
        users.name,
        users.image_url,
        receipts.description
      FROM receipts
      JOIN users ON receipts.user_id = users.id
      WHERE
        users.name ILIKE ${`%${query}%`} OR
        receipts.amount::text ILIKE ${`%${query}%`} OR
        receipts.date::text ILIKE ${`%${query}%`} OR
        receipts.description::text ILIKE ${`%${query}%`} 
      ORDER BY receipts.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return receipts.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch receipts.');
  }
}

export async function fetchFilteredItems(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const receipts = await sql<ItemsTable>`
      SELECT
        items.id as item_id,
        items.name as item_name,
        items.quantity,
        items.description,
        items.tags,
        items.image_url,
        locations.id as location_id,
        locations.name as location_name
      FROM items
      JOIN locations ON locations.id = items.location_id
      WHERE
        items.name ILIKE ${`%${query}%`} OR
        items.tags::text ILIKE ${`%${query}%`} OR
        locations.name::text ILIKE ${`%${query}%`} OR
        items.description::text ILIKE ${`%${query}%`} 
      ORDER BY items.name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return receipts.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch items.');
  }
}

export async function fetchInventoryPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM items
    JOIN locations ON locations.id = location_id
    WHERE
      items.name ILIKE ${`%${query}%`} OR
      items.description ILIKE ${`%${query}%`} OR
      locations.name::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of items.');
  }
}

export async function fetchTransactionsPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM receipts
    JOIN users ON receipts.user_id = users.id
    WHERE
      users.name ILIKE ${`%${query}%`} OR
      users.email ILIKE ${`%${query}%`} OR
      receipts.amount::text ILIKE ${`%${query}%`} OR
      receipts.date::text ILIKE ${`%${query}%`} OR
      receipts.description ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchTransactionById(id: string) {
  try {
    const data = await sql<TransactionForm>`
      SELECT
        receipts.id,
        receipts.user_id,
        receipts.amount,
        receipts.description
      FROM receipts
      WHERE receipts.id = ${id};
    `;

    const receipt = data.rows.map((receipt) => ({
      ...receipt,
      // Convert amount from cents to dollars
      amount: receipt.amount / 100,
    }));

    return receipt[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch receipt.');
  }
}

export async function fetchItemById(id: string) {
  try {
    const data = await sql<ItemForm>`
      SELECT
        items.id,
        items.name,
        items.location_id,
        items.quantity,
        items.image_url,
        items.description
      FROM items
      WHERE items.id = ${id};
    `;

    const item = data.rows;
    return item[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch item.');
  }
}



export async function fetchListItemsById(id: string) {
  try {
    const client = await db.connect();
client.sql
    console.log(`
      SELECT 
      list_items.item_id,
      list_items.list_id,
      items.name as item_name,
      locations.name as location_name,
      locations.id as location_id,
      lists.name as list_name,
      list_items.quantity
    FROM list_items
    JOIN lists on list_items.list_id = lists.id
    JOIN items ON items.id = list_items.item_id
    JOIN locations on location
      `)
    const data = await sql<ListItemResponse>`
      SELECT 
      list_items.item_id,
      list_items.list_id,
      items.name as item_name,
      locations.name as location_name,
      locations.id as location_id,
      lists.name as list_name,
      list_items.quantity
    FROM list_items
    JOIN lists on list_items.list_id = lists.id
    JOIN items ON items.id = list_items.item_id
    JOIN locations on locations.id = items.location_id
    WHERE lists.id = ${id}
    `;

    const item = data.rows;
    console.log(item);
    return item;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lists.');
  }
}

export async function fetchListById(id: string) {
  const client = await db.connect();
  try {
    const data = await sql<ListsTable>`
      SELECT * from lists
    WHERE lists.id = ${id}
    `;

    const item = data.rows;
    console.log(item);
    return item[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lists.');
  }
}


export async function fetchUsers() {
  try {
    const data = await sql<UserField>`
      SELECT
        id,
        name
      FROM users
      ORDER BY name ASC
    `;

    const users = data.rows;
    return users;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all users.');
  }
}

export async function fetchLocations() {
  try {
    const data = await sql<LocationField>`
      SELECT
        id,
        name
      FROM locations
      ORDER BY name ASC
    `;

    const locations = data.rows;
    return locations;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all locations.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function fetchLists() {
  try {
    const data = await sql<ListsTable>`SELECT * FROM lists`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch lists data.');
  }
}