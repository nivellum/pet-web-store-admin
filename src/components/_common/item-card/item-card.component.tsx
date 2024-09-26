import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../button/button.component";
import "./item-card.style.scss";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

type ItemCardType = {
    id: string | null | undefined;
    name?: string;
    handleEditClick: Function;
    handleDeleteClick: Function;
    children: React.ReactNode;
    extraButtons?: React.ReactNode;
}

const ItemCard = ({ id, name, handleEditClick, handleDeleteClick, children, extraButtons }: ItemCardType) => {
    if (id) {
        return (
            <div className={`item-card`}>
                <div className="item-card__header">
                    <div className="item-card__name">{name}</div>
                    <div className="item-card__header-buttons">
                        {extraButtons}
                        <Button handleClick={handleEditClick} color="primary" style="outline"><span><FontAwesomeIcon icon={faEdit} /> <span>{"Edit"}</span></span></Button>
                        <Button handleClick={handleDeleteClick} color="danger" style="outline"><FontAwesomeIcon icon={faTrash} /></Button>
                    </div>
                </div>
                <div className="item-card__content">
                    {children}
                </div>
            </div>
        );
    } else {
        return (
            <div className='item-card item-card_no-content'>
                <span className="item-card__message">{"Please, select an item"}</span>
            </div>
        )
    }
}

export default ItemCard;