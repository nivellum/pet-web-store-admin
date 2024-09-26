import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import "./toolbar.style.scss";

export type ToolbarOption = {
    content: React.ReactNode;
    handleClick: Function;
}

type ToolbarProps = {
    transitionTimeMs?: number
    component: React.ReactNode;
    options: ToolbarOption[];
}

export const Toolbar = ({ transitionTimeMs = 200, component, options }: ToolbarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openClass, setOpenClass] = useState("");
    const [visibleClass, setVisibleClass] = useState("");
    const [justMounted, setJustMounted] = useState(true);
    const [windowSize, setWindowSize] = useState<{ w: number, h: number }>({ w: window.innerWidth, h: window.innerHeight });
    // const [wrapperPosition, setWrapperPosition] = useState<{ x: number, y: number, width: number, height: number }>({ x: 0, y: 0, width: 0, height: 0 });
    const [toolbarPosition, setToolbarPosition] = useState<{ top: number, right: number }>({ top: 0, right: 0 });
    const componentRef = useRef<HTMLDivElement>(null);
    const toolbarRef = useRef<HTMLDivElement>(null);

    const open = () => {
        // console.log("toolbar open");
        setIsOpen(true);
    }

    const close = () => {
        // console.log("toolbar close");
        setIsOpen(false);
    }

    const handleOutsideClick = (event: MouseEvent) => {
        if (toolbarRef && toolbarRef.current && componentRef && componentRef.current) {
            if (isOpen && !toolbarRef.current.contains(event.target as Node) && !componentRef.current.contains(event.target as Node)) {
                close();
            }
        }
    }

    const handleWrapperClick = () => {
        setIsOpen(!isOpen);
        // console.log("toolbar is", !isOpen ? "open" : "closed");
    }

    useEffect(() => {
        let timeout: NodeJS.Timeout | null = null;

        if (isOpen) {
            setJustMounted(false);
            setOpenClass("toolbar_open");
            timeout = setTimeout(() => { setVisibleClass("toolbar_visible") }, 10);
        } else {

            if (justMounted)
                setJustMounted(false);
            else {
                setVisibleClass("");
                timeout = setTimeout(() => { setOpenClass(""); }, transitionTimeMs);
            }
        }


        if (isOpen) {
            document.addEventListener("mousedown", handleOutsideClick)
            // console.log("toolbar document eventHandler added");

            return () => {
                if (timeout)
                    return () => clearTimeout(Number(timeout));

                document.removeEventListener("mousedown", handleOutsideClick);
                // console.log("toolbar document eventHandler removed");
            }
        } else {
            if (timeout)
                return () => clearTimeout(Number(timeout));
        }
    }, [isOpen]);

    const handleResize = (event: Event) => {
        setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    }, []);

    useLayoutEffect(() => {
        if (isOpen && toolbarRef.current && componentRef.current && toolbarRef.current.offsetWidth > 0 && toolbarRef.current.offsetWidth > 0) {
            const top = componentRef.current.offsetTop;
            const right = componentRef.current.offsetLeft - toolbarRef.current.offsetWidth - 10;
            setToolbarPosition({ top, right });
            console.log({ top, right });
        }


    }, [isOpen, windowSize, toolbarRef.current?.offsetWidth, toolbarRef.current?.offsetHeight, componentRef.current?.offsetLeft, componentRef.current?.offsetTop]);

    return (
        <>
            <div className="toolbar-component-wrapper" onClick={handleWrapperClick} ref={componentRef}>{component}</div>
            <div className={`toolbar ${openClass} ${visibleClass}`} ref={toolbarRef}
                style={{
                    transition: `${transitionTimeMs}ms opacity ease`,
                    top: toolbarPosition.top,
                    left: toolbarPosition.right
                }}>
                {
                    options.map((option, index) =>
                        <div key={index} className="toolbar__option" onClick={() => { option.handleClick() }}>
                            {option.content}
                        </div>
                    )
                }
            </div>
        </>
    )
}