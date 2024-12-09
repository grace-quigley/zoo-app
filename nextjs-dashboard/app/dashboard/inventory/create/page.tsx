import Breadcrumbs from '@/app/ui/transactions/breadcrumbs';
import { fetchLocations, fetchUsers } from '@/app/lib/data';
import Form from '@/app/ui/inventory/create-form'; 
export default async function Page() {
  const locations = await fetchLocations();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Inventory', href: '/dashboard/inventory' },
          {
            label: 'Create Item',
            href: '/dashboard/inventory/create',
            active: true,
          },
        ]}
      />
      <Form locations={locations} />
    </main>
  );
}