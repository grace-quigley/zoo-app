// import { addItemToList, updateList } from "@/app/lib/actions"
// import { ItemsTable } from "@/app/lib/definitions"
// import { MinusCircleIcon, PlusCircleIcon } from "lucide-react"

// export default async function AddItem({
//     selectedItems,
//     item,
//     listId,
// }:{
//     selectedItems: ItemsTable[],
//     item: ItemsTable,
//     listId: string
// }) {
//     const addItemWithListId = addItemToList.bind(null, item.item_id, listId);
//     return (
//         <form action={addItemWithListId}> 
//             <button type="submit"className="rounded-md border p-2 hover:bg-gray-100">
//                 <span className="sr-only">Select</span>
//                 {selectedItems.filter((selectedItem) => selectedItem.item_id === item.item_id).length > 0 
//                     ? (<MinusCircleIcon className="w-5" />)
//                     : (<PlusCircleIcon className="w-5"/>)
//                 }
//             </button>
//         </form>
//     )
// }