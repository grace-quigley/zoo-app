import { deleteList } from '@/app/lib/actions';
import { ItemsTable, ListsTable } from '@/app/lib/definitions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { List } from 'lucide-react';
import Link from 'next/link';

export function CreateList() {
  return (
    <Link
      href="/dashboard/inventory/lists/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create List</span>{' '}
      
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function SelectList({lists}: {lists: ListsTable[]}) {
  
  return (
  <>
    <select
      id="list"
      name="listId"
      className="flex h-10 items-center rounded-lg bg-gray-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
    >
      <option value="">
        Select List
      </option>
      {lists.map((list) => (
        <option key={list.id} value={list.id}>
          {list.name}
        </option> 
      ))} 
    </select>
  </>
  );
}

export function BuildList({ items }: { items: ItemsTable[]}) {
  return (
    <Link
      href="/dashboard/inventory/list"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Go To List</span>{' '}
      <List className="h-5 md:ml-4" />
    </Link>
  );
}


export function UpdateList({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/inventory/lists/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteList({ id }: { id: string }) {
  const deleteListWithId = deleteList.bind(null, id);
  return (
    <>
    <form action={deleteListWithId}>
     <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
    </>
  );
}