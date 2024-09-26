import { memo, useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import "./list-view.style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../button/button.component";
import { Toolbar, ToolbarOption } from "../toolbar/toolbar.component";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

export type ListViewItem = {
    id: string;
    name: string;
    handleClick?: Function;
    itemOptions?: ListViewItemOption[];
}

export type ListViewItemOption = {
    text: React.ReactNode;
    handleClick: Function;
}

type ListViewProps = {
    activeItemId?: string;
    items: ListViewItem[] | null;
    className?: string;
    scaleOnHover?: boolean;
}


export const ListView = ({ className, activeItemId, items, scaleOnHover = true }: ListViewProps) => {
    // const [lastAddedItem, setLastAddedItem] = useState<ListViewItem | null>(null);
    // const [justMounted, setJustMounted] = useState<boolean>(true);
    // const lastAddedItemRef = useRef<HTMLLIElement>(null);

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
                    // {...(item.id === lastAddedItem?.id ? { ref: lastAddedItemRef } : {})}
                    key={index}
                    className={`list-view__item ${activeItemId === item.id ? 'list-view__item_active' : ''} ${scaleOnHover ? "list-view__item_scale-on-hover" : ""}`}
                    onClick={() => { if (item.handleClick) item.handleClick() }}>
                    <span>{item.name}</span>

                    {item.itemOptions && item.itemOptions.length === 1 && <Button style="small" handleClick={item.itemOptions[0].handleClick}>{item.itemOptions[0].text}</Button>}

                    {item.itemOptions && item.itemOptions.length > 1 &&
                        <>

                            <Toolbar
                                component={
                                    <Button type="button" style="outline" key={index}><FontAwesomeIcon icon={faEllipsisVertical} /></Button>
                                }
                                options={
                                    item.itemOptions.map((option) => {
                                        return { content: option.text, handleClick: option.handleClick } as ToolbarOption
                                    })
                                }
                            />
                        </>
                    }
                </li>
            )}
        </ul >

    )
}
