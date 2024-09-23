import "./category-card.style.scss";
import Button from "../../../_common/button/button.component";
import { ModalRef, Modal } from "../../../_common/modal/modal.component";
import { FormEvent, useRef, useState } from "react";
import FormInput from "../../../form/form-input/form-input.component";
import Form from "../../../form/form/form.component";
import { ListView } from "../../../_common/list-view/list-view.component";
import ItemCard from "../../../_common/item-card/item-card.component";

type CategoryCardProps = {
    id?: string;
    name?: string;
}

const CategoryCard = ({ id, name }: CategoryCardProps) => {

    const editModalRef = useRef<ModalRef>();
    const deleteModalRef = useRef<ModalRef>();

    const submitUpdateForm = (event: FormEvent) => { }
    const submitDeleteForm = (event: FormEvent) => { }

    return (
        <>
            <Modal title="Edit Category" ref={editModalRef}>
                <Form handleSubmit={submitUpdateForm}>
                    <FormInput name="name" label="Name" value={name} />
                    <Button type="submit" color="success" text="Update" />
                </Form>
            </Modal>

            <Modal title="Delete Category" ref={deleteModalRef}>
                <Form handleSubmit={submitDeleteForm}>
                    <span style={{ marginBottom: "20px" }}>Are you sure you want to delete <b>"{name}"</b>?</span>
                    <Button type="submit" color="danger" text="Delete" />
                </Form>
            </Modal>

            <ItemCard
                id={id}
                name={name}
                handleDeleteClick={() => { deleteModalRef.current?.open() }}
                handleEditClick={() => { editModalRef.current?.open() }}
            >
                <div className="widget">
                    <div className="widget__title">Parameters</div>
                    <ListView items={null} activeItemId={""} />
                </div>
                <div className="widget">
                    <div className="widget__title">Parameter values</div>
                    <ListView items={null} activeItemId={""} />
                </div>
                <div className="widget">
                    <div className="widget__title">Image</div>
                </div>
            </ItemCard>
        </>
    );
}

export default CategoryCard;