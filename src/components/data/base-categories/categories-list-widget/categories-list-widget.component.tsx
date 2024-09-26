import { FormEvent, useEffect, useRef, useState } from "react";
import Button from "../../../_common/button/button.component";
import { createCategory, getCategories } from "../../../../api/services/categories.service";
import { Category } from "../../../../api/models/category.model";
import { ListView, ListViewItem } from "../../../_common/list-view/list-view.component";
import { Modal, ModalRef } from "../../../_common/modal/modal.component";
import { ApiError } from "../../../../api/models/api-error.model";
import Form from "../../../form/form/form.component";
import FormInput from "../../../form/form-input/form-input.component";
import Widget from "../../../_common/widget/widget.component";

type CategoriesListWidgetProps = {
    baseCategoryId: string | null | undefined;
}

const CategoriesListWidget = ({ baseCategoryId }: CategoriesListWidgetProps) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [categoriesListViewItems, setCategoriesListViewItems] = useState<ListViewItem[]>([]);

    const addCategoryModalRef = useRef<ModalRef>();

    const submitCreateCategoryForm = (event: FormEvent) => {
        event.preventDefault();

        const formData = new FormData(event.target as HTMLFormElement);
        const category: Category = Object.fromEntries(formData) as unknown as Category;
        console.log({ category });
        createCategory(category).then((data: Category | ApiError[]) => {
            if (!ApiError.isApiError(data)) {
                const newCategories = categories && categories ? [...categories, data as Category] : [data as Category];
                setCategories(newCategories);
                addCategoryModalRef.current?.close();
            }
        });
    }

    useEffect(() => {
        if (baseCategoryId) {
            getCategories(baseCategoryId).then((data: Category[]) => {
                setCategories(data);
            });
        }
    }, [baseCategoryId]);


    useEffect(() => {
        if (categories)
            setCategoriesListViewItems((categories).map(x => {
                const result: ListViewItem = {
                    id: x._id as string, name: x.name, itemOptions: [
                        { text: "Open category", handleClick: () => { console.log(x._id) } },
                        { text: "Edit", handleClick: () => { console.log(x._id) } },
                        { text: "Delete", handleClick: () => { console.log(x._id) } }
                    ]
                };
                return result;
            }));
    }, [categories]);


    return (
        <>
            <Modal title="Add Category" ref={addCategoryModalRef}>
                <Form handleSubmit={submitCreateCategoryForm}>
                    <FormInput type="hidden" name="baseCategoryId" value={baseCategoryId as string} />
                    <FormInput name="name" label="Name" />
                    <Button type="submit" color="success">Create</Button>
                </Form>
            </Modal>

            <Widget
                title="Categories"
                useGapBetweenElements={false}
                headerButtons={<Button handleClick={() => { addCategoryModalRef?.current?.open() }} style="outline">Add Category</Button>}
            >
                <ListView
                    items={categoriesListViewItems}
                />
            </Widget>
        </>
    );
}

export default CategoriesListWidget;