import "./page-title.style.scss";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
type PageTitleProps = {
    title: string;
    className?: string;
}

const PageTitle = ({ title, className }: PageTitleProps) => {

    const location = useLocation();

    useEffect(() => {
        document.title = process.env.REACT_APP_TITLE + " | " + title;
    }, [location, title]);

    return (
        <h1 className={`page-title ${className ?? ""}`}>{title}</h1>
    )
}

export default PageTitle;