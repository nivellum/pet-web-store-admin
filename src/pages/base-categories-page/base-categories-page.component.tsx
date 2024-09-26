import { FormEvent, useEffect, useRef, useState } from "react";
import Button from "../../components/_common/button/button.component";
import { Modal, ModalRef } from "../../components/_common/modal/modal.component";
import PageTitle from "../../components/_common/page-title/page-title.component";
import FormInput from "../../components/form/form-input/form-input.component";
import Form from "../../components/form/form/form.component";
import { ApiError } from "../../api/models/api-error.model";
import { ListView, ListViewItem } from "../../components/_common/list-view/list-view.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import PageGrid from "../../components/_common/page-grid/page-grid.component";
import { BaseCategory } from "../../api/models/base-category.model";
import { createBaseCategory, getBaseCategories } from "../../api/services/base-categories.service";
import BaseCategoryCard from "../../components/data/base-categories/base-category-card/base-category-card.components";
// import ListView from "../../components/data/list-view/list-view.component";

const BaseCategoriesPage = () => {
    const [currentBaseCategory, setCurrentBaseCategory] = useState<BaseCategory | null>(null);
    const [baseCategories, setBaseCategories] = useState<BaseCategory[] | null>(null);
    const [listViewData, setListViewData] = useState<ListViewItem[] | null>(null);
    const [tempNewBaseCategory, setTempNewBaseCategory] = useState<BaseCategory | null>(null);
    const modalRef = useRef<ModalRef>();

    const handleUpdate = (updatedBaseCategory: BaseCategory) => {
        if (baseCategories) {
            const itemIndex = baseCategories?.indexOf(currentBaseCategory as BaseCategory);
            const cloneBaseCategories = baseCategories.slice();
            cloneBaseCategories.splice(baseCategories?.indexOf(currentBaseCategory as BaseCategory), 1, updatedBaseCategory);
            setBaseCategories(cloneBaseCategories);
        }
    }

    const handleDelete = () => {
        if (baseCategories) {
            const cloneBaseCategories = baseCategories.slice();
            cloneBaseCategories.splice(baseCategories?.indexOf(currentBaseCategory as BaseCategory), 1);
            setBaseCategories(cloneBaseCategories);
            setCurrentBaseCategory(null);
        }
    }

    const handleBaseCategoryClick = (id: string) => {
        const filteredBaseCategories = baseCategories?.filter(x => x._id == id);
        setCurrentBaseCategory(filteredBaseCategories != null && filteredBaseCategories.length > 0 ? filteredBaseCategories[0] : null);
    }

    const handleClickAdd = () => {
        modalRef.current?.open();
    }

    const submitCreateForm = (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const baseCategory: BaseCategory = new BaseCategory(null, formData.get("name") as string, null);

        createBaseCategory(baseCategory).then((data: BaseCategory | ApiError[]) => {
            if (!ApiError.isApiError(data)) {
                const newBaseCategories = baseCategories && baseCategories ? [...baseCategories, data as BaseCategory] : [data as BaseCategory];
                console.log("new base category", data);
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
        if (baseCategories) {
            setListViewData((baseCategories).map(x => {
                const result: ListViewItem = {
                    id: x._id as string,
                    name: x.name,
                    handleClick: () => { handleBaseCategoryClick(x._id as string) }
                };
                return result;
            }));
        }
    }, [baseCategories]);


    return (
        <div className="page">

            <Modal ref={modalRef} title={"Create base category"}>
                <Form handleSubmit={submitCreateForm}>
                    <FormInput name="name" label="Name" />
                    <Button type="submit" color="success">Create</Button>
                </Form>
            </Modal>

            <PageTitle className="page__title" title="Base Categories" />
            <PageGrid
                className="page__content"
                buttons={(
                    <Button color="primary" handleClick={handleClickAdd}>
                        <span><FontAwesomeIcon icon={faPlus} fontSize={"1rem"} /> <span>Add</span></span>
                    </Button>
                )}
                itemsList={(
                    <ListView className="" activeItemId={currentBaseCategory?._id as string} items={listViewData} />
                )}
                itemCard={(
                    <BaseCategoryCard
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                        id={currentBaseCategory?._id}
                        name={currentBaseCategory?.name}
                    />
                )}
            />
        </div>
    );
}

export default BaseCategoriesPage;