import { FormEvent, useEffect, useRef, useState } from "react";
import Button from "../../components/_common/button/button.component";
import { Modal, ModalRef } from "../../components/_common/modal/modal.component";
import PageTitle from "../../components/_common/page-title/page-title.component";
import FormInput from "../../components/form/form-input/form-input.component";
import Form from "../../components/form/form/form.component";
import { ApiError } from "../../api/models/api-error.model";
import { ListView, ListViewItemType } from "../../components/_common/list-view/list-view.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PageGrid from "../../components/_common/page-grid/page-grid.component";
import { BaseCategory } from "../../api/models/base-category.model";
import { createBaseCategory, getBaseCategories } from "../../api/services/base-categories.service";
// import ListView from "../../components/data/list-view/list-view.component";

const BaseCategoriesPage = () => {
    const [currentBaseCategory, setCurrentBaseCategory] = useState<BaseCategory | null>(null);
    const [baseCategories, setBaseCategories] = useState<BaseCategory[] | null>(null);
    const [listViewData, setListViewData] = useState<ListViewItemType[] | null>(null);

    const modalRef = useRef<ModalRef>();

    const handleCategoryClick = (id: string) => {
        const filteredBaseCategories = baseCategories?.filter(x => x._id == id);
        setCurrentBaseCategory(filteredBaseCategories != null && filteredBaseCategories.length > 0 ? filteredBaseCategories[0] : null);
    }

    const handleClickAdd = () => {
        modalRef.current?.open();
    }

    const submitAddForm = (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const baseCategory: BaseCategory = new BaseCategory(null, formData.get("name") as string, null);

        createBaseCategory(baseCategory).then((data: BaseCategory | ApiError[]) => {
            if (!ApiError.isApiError(data)) {
                const newBaseCategories = baseCategories && baseCategories ? [...baseCategories, data as BaseCategory] : [data as BaseCategory];
                console.log("new base category", newBaseCategories);
                setBaseCategories(newBaseCategories);
                setCurrentBaseCategory(data as BaseCategory);
                modalRef.current?.close();
            }
        });
    }

    useEffect(() => {
        getBaseCategories().then((data: BaseCategory[]) => {
            setBaseCategories(data);
        });
    }, []);

    useEffect(() => {
        if (baseCategories)
            setListViewData((baseCategories).map(x => {
                const result: ListViewItemType = { id: x._id as string, name: x.name };
                return result;
            }));
    }, [baseCategories])

    return (
        <div className="page">

            <Modal ref={modalRef} title={"Create Base Category"}>
                <Form handleSubmit={submitAddForm}>
                    <FormInput name="name" label="Name" />
                    <Button type="submit" color="success" text="Save" />
                </Form>
            </Modal>

            <PageTitle className="page__title" title="Base Categories" />
            {/* <div className="page__content"> */}
                <PageGrid
                    className="page__content"
                    buttons={(
                        <Button color="primary" handleClick={handleClickAdd}>
                            <FontAwesomeIcon icon={faPlus} fontSize={"1rem"} />  <span>{"Add"}</span>
                        </Button>
                    )}
                    itemsList={(
                        <ListView className="" handleClick={handleCategoryClick} activeItemId={currentBaseCategory?._id as string} items={listViewData} />
                    )}
                    itemCard={(
                        null
                        // <CategoryCard id={currentBaseCategory?._id as string} name={currentBaseCategory?.name} />
                    )}
                />
            {/* </div> */}
        </div>
    );
}

export default BaseCategoriesPage;