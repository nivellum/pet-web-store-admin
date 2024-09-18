import "./categories-grid.style.scss";

import { FormEvent, useEffect, useRef, useState } from "react";
import { ListViewItemType, ListView } from "../../list-view/list-view.component"
import CategoryCard from "../category-card/category-card.component";
import { createCategory, getCategories } from "../../../../api/services/categories.service";
import { Category } from "../../../../api/models/category.model";
import Button from "../../../_common/button/button.component";
import { ModalRef, Modal } from "../../modal/modal.component";
import FormInput from "../../../form/form-input/form-input.component";
import Form from "../../../form/form/form.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ApiError } from "../../../../api/models/api-error.model";


type CategoriesGridProps = {
    className?: string;
}

const CategoriesGrid = ({ className }: CategoriesGridProps) => {

    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [listViewData, setListViewData] = useState<ListViewItemType[] | null>(null);

    const modalRef = useRef<ModalRef>();

    const handleCategoryClick = (id: string) => {
        const filteredCategories = categories?.filter(x => x._id == id);
        setCurrentCategory(filteredCategories != null && filteredCategories.length > 0 ? filteredCategories[0] : null);
    }

    const handleClickAdd = () => {
        modalRef.current?.open();
    }

    const submitCategoryForm = (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const category: Category = new Category(null, formData.get("name") as string, null);

        createCategory(category).then((data: Category | ApiError[]) => {
            if (!ApiError.isApiError(data)) {
                const newCategories = categories && categories ? [...categories, data as Category] : [data as Category];
                console.log("newcat", newCategories);
                setCategories(newCategories);
                setCurrentCategory(data as Category);
                modalRef.current?.close();
            }
        });
    }

    useEffect(() => {
        getCategories().then((data: Category[]) => {
            setCategories(data);
        });
    }, []);

    useEffect(() => {
        if (categories)
            setListViewData((categories).map(x => {
                const result: ListViewItemType = { id: x._id as string, name: x.name };
                return result;
            }));
    }, [categories])

    useEffect(() => {
        if (currentCategory != null) {
            console.log("loading params");
        }
    }, [currentCategory]);

    return (
        <>
            <Modal ref={modalRef} title={"Create category"}>
                <Form handleSubmit={submitCategoryForm}>
                    <FormInput name="name" label="Name" />
                    <Button type="submit" color="success" text="Save" />
                </Form>
            </Modal>

            <div className={`categories-grid ${className ?? ""}`}>
                <div className="categories-grid__collection">
                    <div className="categories-grid__buttons">
                        <Button color="primary" handleClick={handleClickAdd}>
                            <FontAwesomeIcon icon={faPlus} fontSize={"1rem"} />  <span>{"Add"}</span>
                        </Button>
                    </div>
                    <ListView className="categories-grid__list" handleClick={handleCategoryClick} activeItemId={currentCategory?._id as string} items={listViewData} />
                </div>
                <div className="categories-grid__card">
                    <CategoryCard id={currentCategory?._id as string} name={currentCategory?.name} />
                </div>
            </div>
        </>
    )
}

export default CategoriesGrid;