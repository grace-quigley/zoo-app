import { deleteItem, deleteTransaction, selectItem } from '@/app/lib/actions';
import { ItemsTable } from '@/app/lib/definitions';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { List, PlusCircle } from 'lucide-react';
import Link from 'next/link';
export function CreateItem() {
  return (
    <Link
      href="/dashboard/inventory/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Item</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateItem({ id }: { id: string }) {
  console.log('edit')
  return (
    <Link
      href={`/dashboard/inventory/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteItem({ id }: { id: string }) {
  const deleteItemWithId = deleteItem.bind(null, id);
  return (
    <>
    <form action={deleteItemWithId}>
     <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
    </>
  );
}

export function BuildList() {
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

