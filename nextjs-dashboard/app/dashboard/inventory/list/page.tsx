import Pagination from '@/app/ui/transactions/pagination';
import Search from '@/app/ui/search';
import InventoryTable from '@/app/ui/inventory/table';
import { CreateTransaction } from '@/app/ui/transactions/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInventoryPages } from '@/app/lib/data';
import { CreateItem } from '@/app/ui/inventory/buttons';
 
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

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Project List</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search items..." />
        <CreateItem />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        {/* <ProjectTable selectedItems={[]} /> */}
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* use-debounce avoids searching on every keystroke */}
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}