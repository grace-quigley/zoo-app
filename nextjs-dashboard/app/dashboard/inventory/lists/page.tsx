import Pagination from '@/app/ui/transactions/pagination';
import Search from '@/app/ui/search';
import InventoryTable from '@/app/ui/inventory/table';
import { CreateTransaction } from '@/app/ui/transactions/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInventoryPages, fetchLists } from '@/app/lib/data';
import { CreateItem, CreateList, SelectList } from '@/app/ui/inventory/buttons';
import ListsTable from '@/app/ui/inventory/lists/lists-table';
 
export default async function Page() {

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Inventory Lists</h1>
      </div>
      
       <Suspense fallback={<InvoicesTableSkeleton />}>
        <ListsTable />
      </Suspense>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <CreateList />
      </div>
    </div>
  );
}