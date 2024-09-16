import "./category-card.style.scss";

type CategoryCardProps = {
    id?: string;
    name?: string;
}

const CategoryCard = ({ id, name }: CategoryCardProps) => {

    if (id) {
        return (
            <div className={`category-card ${id === null ? "category-card_no-content" : ""}`}>
                {id && <div className="category-card__name">{name}</div>}
            </div>
        );
    } else {
        return (
            <div className='category-card category-card_no-content'>
                <span className="category-card__message">{"Please, choose category"}</span>
            </div>
        )
    }
}

export default CategoryCard;