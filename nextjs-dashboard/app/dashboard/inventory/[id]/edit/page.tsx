import Form from '@/app/ui/inventory/edit-form';
import Breadcrumbs from '@/app/ui/receipts/breadcrumbs';
import { fetchItemById, fetchLocations, fetchReceiptById, fetchUsers } from '@/app/lib/data';
import { users } from '@/app/lib/placeholder-data';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [item, locations] = await Promise.all([
      fetchItemById(id),
      fetchLocations(),
    ]);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Inventory', href: '/dashboard/inventory' },
          {
            label: 'Edit Item',
            href: `/dashboard/inventory/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form item={item} locations={locations} />
    </main>
  );
}