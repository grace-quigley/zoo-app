import { sql } from '@vercel/postgres';
import {
  UserField,
  CustomersTableType,
  ReceiptForm,
  ReceiptsTable,
  LatestReceiptRaw,
  Expense,
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
    const data = await sql<LatestReceiptRaw>`
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
    const receipts = await sql<ReceiptsTable>`
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

export async function fetchReceiptsPages(query: string) {
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

export async function fetchReceiptById(id: string) {
  try {
    const data = await sql<ReceiptForm>`
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
