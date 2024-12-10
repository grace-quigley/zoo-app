// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.

import { Item } from "./placeholder-data";

// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  image_url?: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  // In TypeScript, this is called a string union type.
  // It means that the "status" property can only be one of the two strings: 'pending' or 'paid'.
  status: 'pending' | 'paid';
};

export type Expense = {
  month: string;
  name: string;
  expense: number;
};

export type LatestTransaction = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  amount: string;
};

// The database returns a number for amount, but we later format it to a string with the formatCurrency function
export type LatestTransactionRaw = Omit<LatestTransaction, 'amount'> & {
  amount: number;
};

export type ItemsTable = {
  item_id: string;
  location_id: string;
  location_name: string;
  item_name: string;
  image_url: string;
  description: string;
  quantity: number;
  tags: string;
};


export type ItemForm = {
  id: string;
  location_id: string;
  quantity: number;
  name: string;
  image_url: string;
  desciprtion: string;
};

export type TransactionsTable = {
  id: string;
  user_id: string;
  name: string;
  image_url: string;
  date: string;
  amount: number;
  description: string;
};

export type CustomersTableType = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: number;
  total_paid: number;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type UserField = {
  id: string;
  name: string;
};

export type LocationField = {
  id: string;
  name: string;
};

export type TransactionForm = {
  id: string;
  user_id: string;
  amount: number;
  status: 'pending' | 'upcoming';
  description: string;
};

export interface CheckedItem extends ItemsTable {
  checked: boolean
}

export type ListsTable = {
  id: string;
  name: string;
  item_ids: string[];
};


export type ListItems = {
  id: string;
  name: string;
  item_name: string;
  item_id: string;
  location_name: string;
  location_id: string;
};
