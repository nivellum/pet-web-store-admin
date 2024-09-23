import { FormEvent, useEffect, useRef, useState } from "react";
import Button from "../../components/_common/button/button.component";
import { Modal, ModalRef } from "../../components/_common/modal/modal.component";
import PageTitle from "../../components/_common/page-title/page-title.component";
import FormInput from "../../components/form/form-input/form-input.component";
import Form from "../../components/form/form/form.component";
import { createCategory, getCategories } from "../../api/services/categories.service";
import { Category } from "../../api/models/category.model";
import { ApiError } from "../../api/models/api-error.model";
import { ListView, ListViewItem } from "../../components/_common/list-view/list-view.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CategoryCard from "../../components/data/categories/category-card/category-card.component";
import PageGrid from "../../components/_common/page-grid/page-grid.component";
// import ListView from "../../components/data/list-view/list-view.component";

const CategoriesPage = () => {
    const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
    const [categories, setCategories] = useState<Category[] | null>(null);
    const [listViewData, setListViewData] = useState<ListViewItem[] | null>(null);

    const addModalRef = useRef<ModalRef>();

    const handleCategoryClick = (id: string) => {
        const filteredCategories = categories?.filter(x => x._id == id);
        setCurrentCategory(filteredCategories != null && filteredCategories.length > 0 ? filteredCategories[0] : null);
    }

    const handleClickAdd = () => {
        addModalRef.current?.open();
    }

    const submitAddForm = (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const category: Category = new Category(null, formData.get("name") as string, "");

        createCategory(category).then((data: Category | ApiError[]) => {
            if (!ApiError.isApiError(data)) {
                const newCategories = categories && categories ? [...categories, data as Category] : [data as Category];
                console.log("newcat", newCategories);
                setCategories(newCategories);
                setCurrentCategory(data as Category);
                addModalRef.current?.close();
            }
        });
    }

    useEffect(() => {
        // getCategories().then((data: Category[]) => {
        //     setCategories(data);
        // });
    }, []);

    useEffect(() => {
        if (categories)
            setListViewData(categories.map(x => {
                const result: ListViewItem = {
                    id: x._id as string,
                    name: x.name,
                    handleClick: () => { handleCategoryClick(x._id as string) }
                };

                return result;
            }));
    }, [categories]);

    useEffect(() => {
        if (currentCategory != null) {
            console.log("loading params");
        }
    }, [currentCategory]);

    return (
        <div className="page">

            <Modal ref={addModalRef} title={"Create category"}>
                <Form handleSubmit={submitAddForm}>
                    <FormInput name="name" label="Name" />
                    <Button type="submit" color="success" text="Save" />
                </Form>
            </Modal>

            <PageTitle className="page__title" title="Categories" />
            <div className="page__filter">

            </div>
            <PageGrid
                className="page__content"
                buttons={(
                    <Button color="primary" handleClick={handleClickAdd}>
                        <FontAwesomeIcon icon={faPlus} fontSize={"1rem"} />  <span>{"Add"}</span>
                    </Button>
                )}
                itemsList={(
                    <ListView className="" activeItemId={currentCategory?._id as string} items={listViewData} />
                )}
                itemCard={
                    <>
                        <CategoryCard id={currentCategory?._id as string} name={currentCategory?.name} />
                    </>
                }
            />
        </div>
    );
}

export default CategoriesPage;