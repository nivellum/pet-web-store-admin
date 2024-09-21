import { FormEvent, useEffect, useRef } from "react";
import ItemCard from "../../../_common/item-card/item-card.component"
import { Modal, ModalRef } from "../../../_common/modal/modal.component";
import FormInput from "../../../form/form-input/form-input.component";
import Button from "../../../_common/button/button.component";
import Form from "../../../form/form/form.component";
import { ListView } from "../../../_common/list-view/list-view.component";

type BaseCategoriesCardProps = {
    id?: string;
    name?: string;
}

const BaseCategoryCard = ({ id, name }: BaseCategoriesCardProps) => {

    const editModalRef = useRef<ModalRef>();
    const deleteModalRef = useRef<ModalRef>();

    const submitUpdateForm = (event: FormEvent) => { }
    const submitDeleteForm = (event: FormEvent) => { }

    useEffect(() => {

    }, [])

    return (
        <>
            <Modal title="Edit Base Category" ref={editModalRef}>
                <Form handleSubmit={submitUpdateForm}>
                    <FormInput name="name" label="Name" value={name} />
                    <Button type="submit" color="success" text="Update" />
                </Form>
            </Modal>

            <Modal title="Delete Base Category" ref={deleteModalRef}>
                <Form handleSubmit={submitDeleteForm}>
                    <span style={{ marginBottom: "20px" }}>
                        <span>Are you sure you want to delete <b>"{name}"</b>?</span>
                    </span>
                    <Button type="button" color="danger" text="Delete" />
                </Form>
            </Modal>

            <ItemCard
                id={id}
                name={name}
                handleEditClick={() => { editModalRef?.current?.open() }}
                handleDeleteClick={() => { deleteModalRef?.current?.open() }}
            >
                <div className="widget">
                    <ListView
                        items={[]}
                        activeItemId={""}
                        handleClick={() => { }}
                    />
                </div>
            </ItemCard>
        </>
    )
}

export default BaseCategoryCard;