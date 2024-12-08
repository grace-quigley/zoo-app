import Image from 'next/image';
import { UpdateReceipt, DeleteReceipt } from '@/app/ui/receipts/buttons';
import InvoiceStatus from '@/app/ui/receipts/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
import { fetchFilteredItems, fetchFilteredReceipts } from '@/app/lib/data';

export default async function InventoryTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const items = await fetchFilteredItems(query, currentPage);

  console.log(items);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {/* {items?.map((item) => (
              <div
                key={item.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={item.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${item.name}'s profile picture`}
                      />
                      <p>{item.name}</p>
                    </div>
                  </div>
                  <InvoiceStatus status={"paid"} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(item.amount)}
                    </p>
                    <p>{formatDateToLocal(item.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateReceipt id={item.id} />
                    <DeleteReceipt id={item.id} />
                  </div>
                </div>
              </div>
            ))} */}
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
                  Description
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Location
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            {/* <tbody className="bg-white">
              {items?.map((receipt) => (
                <tr
                  key={receipt.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={receipt.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${receipt.name}'s profile picture`}
                      />
                      <p>{receipt.name.split(' ')[0]}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(receipt.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {receipt.description}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(receipt.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={"paid"} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateReceipt id={receipt.id} />
                      <DeleteReceipt id={receipt.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody> */}
          </table>
        </div>
      </div>
    </div>
  );
}
