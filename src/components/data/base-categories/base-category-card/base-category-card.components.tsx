import { FormEvent, useEffect, useRef, useState } from "react";
import ItemCard from "../../../_common/item-card/item-card.component"
import { Modal, ModalRef } from "../../../_common/modal/modal.component";
import FormInput from "../../../form/form-input/form-input.component";
import Button from "../../../_common/button/button.component";
import Form from "../../../form/form/form.component";
import { ListView, ListViewItem } from "../../../_common/list-view/list-view.component";
import { Category } from "../../../../api/models/category.model";
import { createCategory, getCategories } from "../../../../api/services/categories.service";
import { ApiError } from "../../../../api/models/api-error.model";
import { BaseCategory } from "../../../../api/models/base-category.model";
import { deleteBaseCategory, updateBaseCategory } from "../../../../api/services/base-categories.service";
import Widget from "../../../_common/widget/widget.component";
import CategoriesListWidget from "../categories-list-widget/categories-list-widget.component";

type BaseCategoriesCardProps = {
    id?: string | null | undefined;
    name?: string;
    onUpdate: Function;
    onDelete: Function;
}

const BaseCategoryCard = ({ id, name, onUpdate, onDelete }: BaseCategoriesCardProps) => {

    const [displayName, setDisplayName] = useState<string | undefined>(name);

    const editBaseCategoryModalRef = useRef<ModalRef>();
    const deleteBaseCategoryModalRef = useRef<ModalRef>();

    const submitUpdateBaseCategoryForm = (event: FormEvent) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form as HTMLFormElement);
        const baseCategory = Object.fromEntries(formData) as unknown as BaseCategory;
        updateBaseCategory(baseCategory).then((data: BaseCategory | ApiError[]) => {
            if (!ApiError.isApiError(data)) {
                onUpdate(data as BaseCategory);
                editBaseCategoryModalRef.current?.close();
                setDisplayName((data as BaseCategory).name);
            }
        });
    }

    const submitDeleteBaseCategoryForm = (event: FormEvent) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form as HTMLFormElement);
        const baseCategory = Object.fromEntries(formData) as unknown as BaseCategory;
        deleteBaseCategory(baseCategory).then((data: BaseCategory | ApiError[]) => {
            if (!ApiError.isApiError(data)) {
                onDelete();
                deleteBaseCategoryModalRef.current?.close();
            }
        });
    }

    useEffect(() => {
        setDisplayName(name);
    }, [name]);

    return (
        <>
            <Modal title="Edit Base Category" ref={editBaseCategoryModalRef}>
                <Form handleSubmit={submitUpdateBaseCategoryForm}>
                    <FormInput type="hidden" name="_id" value={id as string} />
                    <FormInput name="name" label="Name" value={name} />
                    <Button type="submit" color="success" text="Update" />
                </Form>
            </Modal>

            <Modal title="Delete Base Category" ref={deleteBaseCategoryModalRef}>
                <Form handleSubmit={submitDeleteBaseCategoryForm}>
                    <FormInput type="hidden" name="_id" value={id as string} />
                    <span style={{ marginBottom: "20px" }}>
                        <span>Are you sure you want to delete <b>"{name}"</b>?</span>
                    </span>
                    <Button type="submit" color="danger" text="Delete" />
                </Form>
            </Modal>

            <ItemCard
                id={id}
                name={displayName}
                handleEditClick={() => { editBaseCategoryModalRef?.current?.open() }}
                handleDeleteClick={() => { deleteBaseCategoryModalRef?.current?.open() }}
            >
                <CategoriesListWidget baseCategoryId={id} />
            </ItemCard>
        </>
    )
}

export default BaseCategoryCard;