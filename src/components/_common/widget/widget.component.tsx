import "./widget.style.scss";

type WidgetProps = {
    title?: string;
    showHeader?: boolean;
    headerButtons?: React.ReactNode;
    children: React.ReactNode;
    useGapBetweenElements?: boolean;
}

const Widget = ({ title, useGapBetweenElements = true, showHeader = true, headerButtons, children }: WidgetProps) => {
    return (
        <div className={`widget ${useGapBetweenElements ? "" : "widget_no-gap"}`}>
            {showHeader &&
                <div className="widget__header">
                    <span className="widget__title">{title}</span>
                    <div className="widget__buttons">{headerButtons}</div>
                </div>
            }
            {children}
        </div>

    );
}

export default Widget;