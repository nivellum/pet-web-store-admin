import { memo, useDeferredValue, useEffect, useRef, useState } from "react";
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
    const [lastAddedItem, setLastAddedItem] = useState<ListViewItemType | null>(null);
    const [justMounted, setJustMounted] = useState<boolean>(true);
    const lastAddedItemRef = useRef<HTMLLIElement>(null);

    // useEffect(() => {
    //     if (justMounted) setJustMounted(false);
    //     else {
    //         if (items)
    //             setLastAddedItem(items.slice(items.length - 1)[0]);
    //     }
    // }, [items]);

    // useEffect(() => {
    //     if(lastAddedItemRef.current)
    //         lastAddedItemRef.current.scrollIntoView();
    // }, [lastAddedItemRef?.current]);


    // console.log({ lastAddedItem, justMounted });

    return (
        <ul className={`list-view ${className ?? ''}`}>
            <li className='list-view__count'> {items === null || items?.length === 0 ? "No items" : items?.length === 1 ? `${items?.length} item` : `${items?.length} items`}</li>
            {items && items.map((x: ListViewItemType, index: number) =>
                <li
                    {...(x.id === lastAddedItem?.id ? { ref: lastAddedItemRef } : {})}
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
