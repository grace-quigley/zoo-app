import Form from '@/app/ui/transactions/create-form';
import Breadcrumbs from '@/app/ui/transactions/breadcrumbs';
import { fetchUsers } from '@/app/lib/data';
 
export default async function Page() {
  const users = await fetchUsers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Transactions', href: '/dashboard/money' },
          {
            label: 'Create Transaction',
            href: '/dashboard/money/create',
            active: true,
          },
        ]}
      />
      <Form users={users} />
    </main>
  );
}