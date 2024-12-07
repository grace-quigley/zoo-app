import Form from '@/app/ui/receipts/create-form';
import Breadcrumbs from '@/app/ui/receipts/breadcrumbs';
import { fetchUsers } from '@/app/lib/data';
 
export default async function Page() {
  const users = await fetchUsers();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Receipts', href: '/dashboard/money' },
          {
            label: 'Create Receipt',
            href: '/dashboard/money/create',
            active: true,
          },
        ]}
      />
      <Form users={users} />
    </main>
  );
}