import Breadcrumbs from '@/app/ui/transactions/breadcrumbs';
import { fetchLocations, fetchUsers } from '@/app/lib/data';
import Form from '@/app/ui/inventory/lists/create-list-form'; 
export default async function Page() {
  const locations = await fetchLocations();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Inventory Lists', href: '/dashboard/inventory/lists' },
          {
            label: 'Create List',
            href: '/dashboard/inventory/lists/create',
            active: true,
          },
        ]}
      />
    <Form/>
    </main>
  );
}