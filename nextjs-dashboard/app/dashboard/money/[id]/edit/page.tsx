import Form from '@/app/ui/transactions/edit-form';
import Breadcrumbs from '@/app/ui/transactions/breadcrumbs';
import { fetchTransactionById, fetchUsers } from '@/app/lib/data';
import { users } from '@/app/lib/placeholder-data';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [transaction, users] = await Promise.all([
      fetchTransactionById(id),
      fetchUsers(),
    ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Transactions', href: '/dashboard/money' },
          {
            label: 'Edit Transaction',
            href: `/dashboard/money/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form transaction={transaction} users={users} />
    </main>
  );
}