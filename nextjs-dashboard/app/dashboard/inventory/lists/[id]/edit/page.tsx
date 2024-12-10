import Form from '@/app/ui/inventory/lists/edit-list-form';
import Breadcrumbs from '@/app/ui/transactions/breadcrumbs';
import { fetchItemById, fetchListbyId, fetchLocations, fetchTransactionById, fetchUsers } from '@/app/lib/data';
import { users } from '@/app/lib/placeholder-data';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const list = await fetchListbyId(id)
    
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Inventory Lists', href: '/dashboard/inventory/lists' },
          {
            label: 'Edit List',
            href: `/dashboard/inventory/lists/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form list={list} />
    </main>
  );
}