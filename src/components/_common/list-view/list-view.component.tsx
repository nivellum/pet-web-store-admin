import { memo, useDeferredValue, useEffect, useRef, useState } from "react";
import "./list-view.style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../button/button.component";

export type ListViewItem = {
    id: string;
    name: string;
    handleClick?: Function;
    itemOptions?: ListViewItemOption[];
}

export type ListViewItemOption = {
    text: string;
    handleClick: Function;
}

type ListViewProps = {
    activeItemId?: string;
    items: ListViewItem[] | null;
    className?: string;
    scaleOnHover?: boolean;
}


export const ListView = ({ className, activeItemId, items, scaleOnHover = true }: ListViewProps) => {
    const [lastAddedItem, setLastAddedItem] = useState<ListViewItem | null>(null);
    // const [justMounted, setJustMounted] = useState<boolean>(true);
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
            {items && items.map((item: ListViewItem, index: number) =>
                <li
                    {...(item.id === lastAddedItem?.id ? { ref: lastAddedItemRef } : {})}
                    // ref={x.id == lastAddedItem?.id && newElementRef}
                    key={index}
                    className={`list-view__item ${activeItemId === item.id ? 'list-view__item_active' : ''} ${scaleOnHover ? "list-view__item_scale-on-hover" : ""}`}
                    onClick={() => { if (item.handleClick) item.handleClick() }}>
                    <span>{item.name}</span>

                    {item.itemOptions && item.itemOptions.length === 1 && <Button style="small" handleClick={item.itemOptions[0].handleClick} text={item.itemOptions[0].text} />}
                    {item.itemOptions && item.itemOptions.length > 1 && item.itemOptions.map(option => <Button style="small" handleClick={option.handleClick} text={option.text} />)}
                </li>
            )}
        </ul>

    )
}
