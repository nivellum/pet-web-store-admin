import "./button.style.scss";

import { MouseEventHandler } from "react";

type ButtonProps = {
    text?: string;
    children?: React.ReactNode;
    style?: string;
    handleClick?: Function;
    type?: "button" | "reset" | "submit";
}

const Button = ({ type = "button", children, text, style, handleClick }: ButtonProps) => {
    return (
        <button type={type} className={`button ${style ? "button_" + style : ""}`} onClick={() => { if (handleClick) handleClick() }}>
            {children ?? text}
        </button>
    )
}

export default Button;