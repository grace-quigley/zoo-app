'use client'
import { fetchFilteredItems } from '@/app/lib/data';
import { ItemsTable, ListsTable } from '@/app/lib/definitions';
import {  BuildList, DeleteItem, UpdateItem } from './buttons';
import ItemRows from './item-rows';
import { useState } from 'react';
import { ArrowUpRight, BadgeIcon, CheckCircleIcon, CircleAlertIcon, CircleDotIcon, CircleIcon, GlassesIcon, List, ListIcon, MinusCircleIcon, PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';
import AddItem from './add-item';
import { addItemToList } from '@/app/lib/actions';

export default function InventoryTable({
  items,
  lists
}: {
  items: ItemsTable[],
  lists: ListsTable[]
}) {
  const t: { id: string, quantity: number}[] = [] 
  const [selectedList, setSelectedList] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<{ id: string, quantity: number}[]>([]);
  const handleClick = (item: ItemsTable, add: boolean) => {
    let existing = false
    let newSelectedItems = selectedItems.flatMap((selectedItem) => { 
      if (selectedItem.id === item.item_id) { 
        add ?
        selectedItem.quantity ++
        : selectedItem.quantity --; 
        existing = true;
      }
      return selectedItem;
    })

    if(!existing) { 
      newSelectedItems = [...selectedItems, { id: item.item_id, quantity : 1}];
    }

    setSelectedItems(newSelectedItems);
  }  
  const handleAdd = async (listId: string) => { 
    console.log('adding to list: ', listId)
    // const s = await addItemToList(listId, selectedItems[0].id)
  }
  // const handleSelectionClick = (item: ItemsTable) => {
  //       let newSelections;
  //       if(selectedItems.filter((selectedItem) => selectedItem.item_id === item.item_id).length > 0) {
  //           newSelections = selectedItems.filter((selectedItem) => selectedItem.item_id !== item.item_id)
  //       } else { 
  //           newSelections = [...selectedItems, item]
  //       }
  //       setSelectedItems(newSelections);
  //   }
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
                    <DeleteItem id={item.item_id} />
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
                      {/* <AddItem item={item} selectedItems={selectedItems} /> */}
                      <form action={() => {handleClick(item, false)}}> 
                        <button type="submit"className="rounded-md border p-2 hover:bg-gray-100">
                            <span className="sr-only">Select</span>
                                 <MinusCircleIcon className="w-5" />
                        </button>
                      </form>
                      <button className="text-white text-sm h-9 w-9 rounded-lg border p-2 m-1 hover:bg-pink-100 bg-pink-400">
                        {selectedItems.find((s) => s.id === item.item_id)?.quantity ?? 0}
                      </button>
                      <form action={() => {handleClick(item, true)}}> 
                        <button type="submit"className="rounded-md border p-2 hover:bg-gray-100">
                            <span className="sr-only">Select</span>
                                 <PlusCircleIcon className="w-5" />
                        </button>
                      </form>

                    </div>
                  </td> 
                </tr>
              ))}
            </tbody>
          </table>

      <div className="mt-5 flex justify-center gap-2">
          <select onChange={(e) => setSelectedList(e.target.value)}
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
          <button disabled={selectedList === ''} type="submit" onClick={() => handleAdd(selectedList)} className="rounded-md border p-2 bg-green-300 hover:bg-green-100"> 
           <CheckCircleIcon className="w-5" />
          </button>
          <button className="rounded-md border p-2 hover:bg-gray-100"
          > 
          <Link
            href={`/dashboard/inventory/lists`}
          >
           <GlassesIcon className="w-5" />
          </Link>
          </button>
          
        </div>
      </div>
      </div>
    </div>
  );
}
