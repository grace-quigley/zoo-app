import Image from 'next/image';
import { UpdateReceipt, DeleteReceipt } from '@/app/ui/receipts/buttons';
import InvoiceStatus from '@/app/ui/receipts/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredItems, fetchFilteredReceipts } from '@/app/lib/data';
import { ItemsTable } from '@/app/lib/definitions';
import { DeleteItem, UpdateItem } from './buttons';

export default async function InventoryTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const items: ItemsTable[] = await fetchFilteredItems(query, currentPage);

  console.log(items);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {items?.map((item) => (
              <div
                key={item.item_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>[*]</p>
                      {/* <p>${item.image_url}</p> */}
                      {/* <Image
                        src={item.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${item.item_name}'s picture`}
                      /> */}
                      <p>{item.item_name}</p>
                    </div>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {item.quantity}
                    </p>
                    <p className="text-xl font-medium">
                      {item.location_name}
                    </p>
                    <p className="text-xl font-medium">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateItem id={item.item_id} />
                    {/* <DeleteReceipt id={item.id} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Quantity
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Location
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Description
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {items?.map((item) => (
                <tr
                  key={item.item_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      {/* <Image
                        src={item.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${item.item_name}'s picture`}
                      /> */}
                      {/* <p>{item.image_url}</p> */}
                      <p>[*]</p>
                      <p>{item.item_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.quantity}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.location_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.description}
                  </td>
                  
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateItem id={item.item_id} />
                      <DeleteItem id={item.item_id} />
                    </div>
                  </td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
