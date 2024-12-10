import Pagination from '@/app/ui/transactions/pagination';
import Search from '@/app/ui/search';
import InventoryTable from '@/app/ui/inventory/table';
import { CreateTransaction } from '@/app/ui/transactions/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchLists, fetchFilteredItems, fetchInventoryPages } from '@/app/lib/data';
import { CreateItem, SelectList } from '@/app/ui/inventory/buttons';
import { ItemsTable, ListsTable } from '@/app/lib/definitions';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
 
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = await searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchInventoryPages(query);
  const items: ItemsTable[] = await fetchFilteredItems(query, currentPage);
  const lists: ListsTable[] = await fetchLists();
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Inventory</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search items..." />
        <CreateItem />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <InventoryTable items={items} lists={lists}/>
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* use-debounce avoids searching on every keystroke */}
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}