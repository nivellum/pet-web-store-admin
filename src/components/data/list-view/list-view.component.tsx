import { useDeferredValue, useEffect, useRef, useState } from "react";
import "./list-view.style.scss";

export type ListViewItemType = {
    id: string;
    name: string;
}

type ListViewProps = {
    activeItemId: string | undefined;
    items: ListViewItemType[] | null;
    handleClick: Function;
    className?: string;
}


export const ListView = ({ className, activeItemId, items, handleClick }: ListViewProps) => {

    const defferedItems = useDeferredValue<ListViewItemType[] | null>(items);
    const newElementRef = useRef();
    const [lastAddedItem, setLastAddedItem] = useState<ListViewItemType | null>(null);


    useEffect(() => {
        const newItem = defferedItems?.filter(x => !items?.includes(x));
        if (newItem && newItem.length > 0)
            setLastAddedItem(newItem[0]);
    }, [defferedItems]);


    return (
        <ul className={`list-view ${className ?? ''}`}>
            <li className='list-view__count'> {items?.length} items</li>
            {items && items.map((x: ListViewItemType, index: number) =>
                <li
                    // {...(x.id == lastAddedItem?.id ? { ref: newElementRef } : {})}
                    // ref={x.id == lastAddedItem?.id && newElementRef}
                    key={index}
                    className={`list-view__item ${activeItemId === x.id ? 'list-view__item_active' : ''}`}
                    onClick={() => { handleClick(x.id) }}>
                    {x.name}
                </li>
            )}
        </ul>

    )
}
