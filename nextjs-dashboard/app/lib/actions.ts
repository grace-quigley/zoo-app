'use server';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
const FormSchema = z.object({
    id: z.string(),
    userId: z.string(),
    amount: z.coerce.number(),
    description: z.string(),
    status: z.enum(['upcoming', 'paid']),
    date: z.string(),
})

// TODO: add status to tables
const CreateReceipt = FormSchema.omit({ id: true, date: true, status: true });
const EditReceipt = FormSchema.omit({ id: true, date: true, status: true });
const DeleteReceipt = FormSchema.omit({ id: true, date: true, status: true });

// behind the scenes, react creates a POST API endpoint when using Server Actions
export async function createReceipt(formData: FormData) {
    const { userId, amount, description } = CreateReceipt.parse({
        userId: formData.get('userId'),
        amount: formData.get('amount'),
        description: formData.get('description')
      });
    //   best practice store amounts in cents for accuracy in calcs
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    await sql`
      INSERT INTO receipts (user_id, amount, description, date)
      VALUES (${userId}, ${amountInCents}, ${description}, ${date})
    `;
    revalidatePath('/dashboard/money');
    redirect('/dashboard/money');
}

export async function updateReceipt(id: string, formData: FormData) {
    const { userId, amount, description } = EditReceipt.parse({
        userId: formData.get('userId'),
        amount: formData.get('amount'),
        description: formData.get('description')
      });
    //   best practice store amounts in cents for accuracy in calcs
    const amountInCents = amount * 100;
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

export async function deleteReceipt(id: string) {
    await sql`
      DELETE FROM receipts
      WHERE id = ${id}
    `;
    revalidatePath('/dashboard/money');
}