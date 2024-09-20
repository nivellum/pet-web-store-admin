
import './page-grid.style.scss';

type PageGridProps = {
    className?: string;
    buttons: React.ReactNode;
    itemsList: React.ReactNode;
    itemCard: React.ReactNode;
}

const PageGrid = ({ className, buttons, itemsList, itemCard }: PageGridProps) => {
    return (
        <div className={`page-grid ${className ?? ""}`}>
            <div className="page-grid__collection">
                <div className="page-grid__buttons">
                    {buttons}
                </div>
                <div className="page-grid__list">
                    {itemsList}
                </div>
            </div>
            <div className="page-grid__card">
                {itemCard}
            </div>
        </div>
    );
}

export default PageGrid;