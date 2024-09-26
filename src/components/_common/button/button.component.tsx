import "./button.style.scss";

import { MouseEventHandler, useEffect, useState } from "react";

type ButtonProps = {
    children?: React.ReactNode;
    color?: "primary" | "danger" | "warning" | "success" | "dark" | "light";
    style?: "default" | "outline" | "small";
    handleClick?: Function;
    type?: "button" | "reset" | "submit";
}

const Button = ({ type = "button", children, color = "light", style = "default", handleClick }: ButtonProps) => {
    return (
        <button
            type={type}
            className={`button button_${style} button_${color}`}
            onClick={() => { if (handleClick) handleClick() }}>
            {children}
        </button>
    )
}

export default Button;