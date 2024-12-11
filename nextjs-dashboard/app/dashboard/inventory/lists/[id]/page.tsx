import Form from '@/app/ui/inventory/edit-form';
import Breadcrumbs from '@/app/ui/transactions/breadcrumbs';
import { fetchItemById, fetchListItemsById, fetchLocations, fetchTransactionById, fetchUsers } from '@/app/lib/data';
import { users } from '@/app/lib/placeholder-data';
import ListItemsViewTable from '@/app/ui/inventory/lists/list-table';
 
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const listItems = await fetchListItemsById(id);
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Inventory Lists', href: '/dashboard/inventory/lists' },
          {
            label: 'View List',
            href: `/dashboard/inventory/lists/${id}`,
            active: true,
          },
        ]}
      />
      <ListItemsViewTable listItems={listItems} />
      {/* <Form item={item} locations={locations} /> */}
    </main>
  );
}