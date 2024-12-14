'use client'
import { ItemsTable, ListItemResponse, ListItems, ListsTable } from '@/app/lib/definitions';
import {  DeleteItem, UpdateItem } from './buttons';
import { useEffect, useState } from 'react';
import { GlassesIcon, MinusCircleIcon, PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { updateItemInList, fetchListItemsById, AddItemToListRequest } from '@/app/lib/actions';
import { redirect } from 'next/navigation';
import AddItemToListForm from './add-to-list';

// TODO 
//  extract editing list to a differnet component
// make it reactive for smaller screens
// update view list to display the items in the list
// add stock levels / warnings
// quick add item that doesn't exist to list
export default function InventoryTable({
  items,
  lists
}: {
  items: ItemsTable[],
  lists: ListsTable[],
}) {
  const [selectedList, setSelectedList] = useState<string>('');
  const [currListItems, setCurrListItems] = useState<ListItemResponse[]>([])
  const [disableAdd, setDisableAdd] = useState<boolean>(selectedList === '');

  const handleListSelection = async (listId: string) => {
    if(listId === 'newList') {
      redirect('/dashboard/inventory/lists/create');
    } else { 
      setSelectedList(listId);
      const updatedCurrItems = listId !== '' ? await fetchListItemsById(listId) : [];
      updatedCurrItems.map((item) => {
        if(!item.quantity) {
          item.quantity = 0;
        }
      })
      setCurrListItems(updatedCurrItems);
      setDisableAdd(listId === ''); 
    }   
  }

  useEffect(() => { 
     setDisableAdd(selectedList === '');
  }, [selectedList, currListItems, disableAdd])

  const updateListItemQuantity = async (item: ItemsTable) => { 
    await updateItemInList({ listId: selectedList, itemId: item.item_id, quantity: item.quantity} as AddItemToListRequest)
    const updatedCurrItems = await fetchListItemsById(selectedList);
    updatedCurrItems.map((item) => {
      if(!item.quantity) {
        item.quantity = 0;
      }
    })
    setCurrListItems(updatedCurrItems);
  }
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
                  {
                    disableAdd ? (
                      undefined
                    ) : (
                      <div className="flex justify-end gap-2">
                        <UpdateItem id={item.item_id} />
                        <DeleteItem id={item.item_id} />
                      </div>
                    )
                  }
                 
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
                <th scope="col" className="px-3 py-5 font-medium ">
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
                { disableAdd ? ( undefined ) : ( 
                   <th scope="col" className="px-3 py-5 font-medium">
                   In List
                 </th>
                )}
               
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
                      {/* <Imageƒ
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
                  <td className="whitespace-nowrap flex items-center px-3 py-5 gap-1">
                    <p className="justify-center flex">{item.quantity}</p> 
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.location_name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {item.description}
                  </td>
                  {
                    disableAdd ? ( 
                      <td className="whitespace-nowrap py-3 px-3">
                        <div className="flex justify-left">
                          <UpdateItem id={item.item_id} />
                          <DeleteItem id={item.item_id} />
                        </div>
                      </td>
                     ) 
                    : (
                      <>
                        <td className="whitespace-nowrap py-4 pl-3 pr-3">
                            <div className="flex justify-center rounded-full border">
                              <AddItemToListForm item={item} updateListItemQuantity={updateListItemQuantity}/>
                            </div>
                        </td> 
                        <td className="whitespace-nowrap px-3 py-3 gap-1">
                          <button className="text-white text-sm h-9 w-9 rounded-full border p-2 m-1 hover:bg-gray-100 bg-gray-600">
                                {currListItems.find((currItem) => currItem.item_id === item.item_id)?.quantity ?? 0}
                          </button>
                        </td>
                      </>
                    )
                  }
                </tr>
              ))}
            </tbody>
          </table>

      <div className="mt-5 flex justify-center gap-2">
          <select onChange={(e) => handleListSelection(e.target.value)}
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
            <option key={"newList"} value={"newList"}>
              Create new list
            </option>
          </select>
          <button className="rounded-md border p-2 hover:bg-gray-100"
          > 
          <Link
            href={`/dashboard/inventory/lists/${selectedList}`}
          >
            <span className="text-sm flex gap-2 rounded-md"> View Lists
           <GlassesIcon className="w-5" />
           </span>
          </Link>
          </button>
          
        </div>
      </div>
      </div>
    </div>
  );
}
