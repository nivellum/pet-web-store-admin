import PageTitle from "../../components/_common/page-title/page-title.component";
import CategoriesGrid from "../../components/data/categories/categories-grid/categories-grid.component";
// import ListView from "../../components/data/list-view/list-view.component";

const CategoriesPage = () => {
    return (
        <div className="page">
            <PageTitle className="page__title" title="Categories" />
            <CategoriesGrid className="page__content"/>
        </div>
    );
}

export default CategoriesPage;