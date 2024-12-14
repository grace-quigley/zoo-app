'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { ListItemResponse } from './definitions';

// TRANSACTION ACTIONS
const TransactionFormSchema = z.object({
  id: z.string(),
  userId: z.string(),
  amount: z.coerce.number(),
  description: z.string(),
  status: z.enum(['upcoming', 'paid']),
  date: z.string(),
})

// TODO: add status to tables
const CreateTransaction = TransactionFormSchema.omit({ id: true, date: true, status: true });
const EditTransaction = TransactionFormSchema.omit({ id: true, date: true, status: true });
const DeleteTransaction = TransactionFormSchema.omit({ id: true, date: true, status: true });

// behind the scenes, react creates a POST API endpoint when using Server Actions
export async function createTransaction(formData: FormData) {
    const { userId, amount, description } = CreateTransaction.parse({
        userId: formData.get('userId'),
        amount: formData.get('amount'),
        description: formData.get('description')
      });
    //   best practice store amounts in cents for accuracy in calcs
    const amountInCents = amount * 100;
    Math.round(amountInCents).toPrecision(15);
    const date = new Date().toISOString().split('T')[0];

    await sql`
      INSERT INTO receipts (user_id, amount, description, date)
      VALUES (${userId}, ${amountInCents}, ${description}, ${date})
    `;
    revalidatePath('/dashboard/money');
    redirect('/dashboard/money');
}

export async function updateTransaction(id: string, formData: FormData) {
    const { userId, amount, description } = EditTransaction.parse({
        userId: formData.get('userId'),
        amount: formData.get('amount'),
        description: formData.get('description')
      });
    //   best practice store amounts in cents for accuracy in calcs
    const amountInCents = amount * 100;
    Math.round(amountInCents).toPrecision(15);
    const date = new Date().toISOString().split('T')[0];

    await sql`
      UPDATE receipts
      SET user_id = ${userId}, amount = ${amountInCents},
      description = ${description}
      WHERE id = ${id}
    `;
    revalidatePath('/dashboard/money');
    redirect('/dashboard/money');
}

export async function deleteTransaction(id: string) {
    await sql`
      DELETE FROM receipts
      WHERE id = ${id}
    `;
    revalidatePath('/dashboard/money');
}

// INVENTORY ACTIONS 
const ItemFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  locationId: z.string(),
  quantity: z.number(),
  description: z.string(),
  imageUrl: z.string()
})
const EditItem = ItemFormSchema.omit({ id: true});
const CreateItem = ItemFormSchema.omit({ id: true});

export async function updateItem(id: string, formData: FormData) {
  const { locationId, quantity, name, description, imageUrl } = EditItem.parse({
      locationId: formData.get('locationId'),
      quantity: Number(formData.get('quantity')),
      description: formData.get('description'),
      name: formData.get('name'),
      imageUrl: formData.get('imageUrl')?.toString()
    });
    await sql`
      UPDATE items
      SET name = ${name}, quantity = ${quantity},
      description = ${description}, location_id = ${locationId},
      image_url = ${imageUrl}
      WHERE id = ${id}
    `;
  revalidatePath('/dashboard/inventory');
  redirect('/dashboard/inventory');
}

export async function deleteItem(id: string) {
  await sql`
    DELETE FROM items
    WHERE id = ${id}
  `;
  revalidatePath('/dashboard/inventory');
}

export async function createItem(formData: FormData) {
  const { locationId, quantity, name, description, imageUrl } = CreateItem.parse({
    locationId: formData.get('locationId'),
    quantity: Number(formData.get('quantity')),
    description: formData.get('description'),
    name: formData.get('name'),
    imageUrl: formData.get('imageUrl')?.toString()
  });
  await sql`
    INSERT INTO items (name, location_id, quantity, description, image_url, tags)
    VALUES (${name}, ${locationId}, ${quantity}, ${description}, ${imageUrl}, '#tag')
  `;
  revalidatePath('/dashboard/inventory');
  redirect('/dashboard/inventory');
}
const ListFormSchema = z.object({
  id: z.string(),
  name: z.string(),
})
const CreateList = ListFormSchema.omit({ id: true});
const EditList = ListFormSchema.omit({ id: true});

export async function createSimpleListByName(listName: string) {
  const idData = await sql<{id: string}>`
    INSERT INTO lists (name)
    VALUES (${listName})
    RETURNING id
  `;
  const id = idData.rows;
  revalidatePath('/dashboard/inventory');
  return id[0].id;
}

export async function createList(formData: FormData) {
  const { name } = CreateList.parse({
    name: formData.get('name')
  });
  const idData = await sql<{id: string}>`
    INSERT INTO lists (name)
    VALUES (${name})
    RETURNING id
  `;
  const id = idData.rows;
  revalidatePath('/dashboard/inventory/lists');
  redirect('/dashboard/inventory/lists');

}

export async function deleteList(id: string) {
  await sql`
    DELETE FROM lists
    WHERE id = ${id}
  `;
  revalidatePath('/dashboard/inventory/lists');
}

export async function updateList(id: string, formData: FormData) {
  const { name  } = EditList.parse({
      name: formData.get('name')
    });
    await sql`
      UPDATE lists
      SET name = ${name}
      WHERE id = ${id}
    `;
  revalidatePath('/dashboard/inventory/lists');
  redirect('/dashboard/inventory/lists');
}

export type AddItemToListRequest = { 
  listId: string;
  itemId: string;
  quantity: number;
}
export async function updateItemInList(request: AddItemToListRequest) {
    console.log(request);
    const existingRows =  await sql`
      SELECT * from list_items 
      WHERE list_id = ${request.listId} AND item_id = ${request.itemId}
    `;
    const data = existingRows.rows;
    if(data && data.length > 0) { 
      await sql`
        UPDATE list_items
        SET quantity = quantity + ${request.quantity}
        WHERE list_id = ${request.listId} AND item_id = ${request.itemId}
      `
    } else { 
      await sql `
        INSERT INTO list_items(list_id, item_id, quantity)
        VALUES(${request.listId}, ${request.itemId}, ${request.quantity});

      `
    }
      await sql`
      UPDATE items
      SET quantity = quantity + ${request.quantity}
      WHERE id = ${request.itemId}
    `
  revalidatePath('/dashboard/inventory');
}
export async function fetchListItemsById(id: string) {
  try {
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