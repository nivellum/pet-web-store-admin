import "./button.style.scss";

import { MouseEventHandler, useEffect, useState } from "react";

type ButtonProps = {
    text?: string;
    children?: React.ReactNode;
    style?: string | string[];
    handleClick?: Function;
    type?: "button" | "reset" | "submit";
}

const Button = ({ type = "button", children, text, style, handleClick }: ButtonProps) => {
    // const [extraClasses, setExtraClasses] = useState<string>("");

    // useEffect(() => {
    //     if (style) {
    //         if (Array.isArray(style)) {
    //             let classes = ""
    //             for (var item of style) {
    //                 classes += " button_" + item;
    //             }
    //             setExtraClasses(classes);
    //         } else {
    //             setExtraClasses("button_" + style);
    //         }
    //     }

    // }, [style]);

    return (
        <button type={type} className={`button ${Array.isArray(style) ? style.map(x => "button_" + x).join(" ") : "button_" + style}`} onClick={() => { if (handleClick) handleClick() }}>
            {children ?? text}
        </button>
    )
}

export default Button;