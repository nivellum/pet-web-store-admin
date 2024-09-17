import "./button.style.scss";

import { MouseEventHandler, useEffect, useState } from "react";

type ButtonProps = {
    text?: string;
    children?: React.ReactNode;
    color?: "primary" | "danger" | "warning" | "success" | "dark" | "light";
    style?: "default" | "outline";
    handleClick?: Function;
    type?: "button" | "reset" | "submit";
}

const Button = ({ type = "button", children, text, color = "light", style = "default", handleClick }: ButtonProps) => {
    return (
        <button
            type={type}
            className={`button button_${style} button_${color}`}
            onClick={() => { if (handleClick) handleClick() }}>
            {children ?? text}
        </button>
    )
}

export default Button;