import { ItemsTable, ListItemResponse } from "@/app/lib/definitions";
import { CheckCircleIcon, MessageCircleWarning, MinusCircleIcon, PlusCircleIcon, TriangleAlertIcon } from "lucide-react"
import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
export default function AddItemToListForm({
    item,
    updateListItemQuantity
}:{
    item: ItemsTable,
    updateListItemQuantity: (item: ItemsTable) => void
}) {
    const [quantity, setQuantity] = useState<number>(0);
    const increase = () => {
       const newListQuantity = quantity + 1;
       setQuantity(newListQuantity);
    }

    const decrease = () => {
        const newListQuantity = quantity - 1;
        setQuantity(newListQuantity);
     }
    useEffect(() => {
    }, [item.quantity, quantity]) 

    const updateListItem = updateListItemQuantity.bind(null, {...item, quantity: quantity})
    return (
        <>
        <form action={decrease}>
            <button type="submit" className={`p-2`}>
                <MinusCircleIcon className="w-4"/>
            </button>
        </form>
            <span className="text-white text-center text-sm h-8 w-9 rounded-full p-2 m-1 bg-pink-400">
                {quantity}
            </span>
        <form action={increase}>
            <button type="submit" className={`p-2`}>
                <PlusCircleIcon className="w-4"/>
            </button>
        </form>
        <form action={updateListItem}>
            <button type="submit" disabled={quantity === 0}  style={{color: "green" }} className={`p-2 ${quantity === 0 ? 'opacity-20' : ''}`}>
                <CheckCircleIcon className="w-4"/>
            </button>
        </form>
        </> 
        
    )
}