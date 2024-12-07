import Form from '@/app/ui/receipts/edit-form';
import Breadcrumbs from '@/app/ui/receipts/breadcrumbs';
import { fetchReceiptById, fetchUsers } from '@/app/lib/data';
import { users } from '@/app/lib/placeholder-data';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [receipt, users] = await Promise.all([
      fetchReceiptById(id),
      fetchUsers(),
    ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Receipts', href: '/dashboard/money' },
          {
            label: 'Edit Receipt',
            href: `/dashboard/money/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form receipt={receipt} users={users} />
    </main>
  );
}