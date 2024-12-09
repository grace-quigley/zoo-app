'use client'
import { items } from "@/app/lib/placeholder-data";
import { UpdateItem, DeleteItem, BuildList } from "./buttons";
import { ItemsTable } from "@/app/lib/definitions";
import { ArrowRightCircleIcon, CheckCircle, MinusCircleIcon, PlusCircleIcon, PlusIcon, ShoppingBag, ShoppingBagIcon, ShoppingCart, ShoppingCartIcon } from "lucide-react";
import { useState } from "react";

export default function ItemRows({items}:{ items: ItemsTable[]}) {
    const [selectedItems, setSelectedItems] = useState<ItemsTable[]>([]);
    const handleSelectionClick = (item: ItemsTable) => {
        let newSelections;
        if(selectedItems.filter((selectedItem) => selectedItem.item_id === item.item_id).length > 0) {
            newSelections = selectedItems.filter((selectedItem) => selectedItem.item_id !== item.item_id)
        } else { 
            newSelections = [...selectedItems, item]
        }
        setSelectedItems(newSelections);
    }
    
    return (
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
                      <form action={() => {handleSelectionClick(item)}}> 
                        <button type="submit"className="rounded-md border p-2 hover:bg-gray-100">
                            <span className="sr-only">Select</span>
                            {selectedItems.filter((selectedItem) => selectedItem.item_id === item.item_id).length > 0 
                                ? (<MinusCircleIcon className="w-5" />)
                                : (<PlusCircleIcon className="w-5"/>)
                            }
                        </button>
                      </form>
                    </div>
                  </td> 
                </tr>
                
              ))}
            </tbody>
    )
}