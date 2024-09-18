import FontAwesome from "react-fontawesome";
import "./category-card.style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../_common/button/button.component";
import { ModalRef, Modal } from "../../modal/modal.component";
import { FormEvent, useRef, useState } from "react";
import FormInput from "../../../form/form-input/form-input.component";
import Form from "../../../form/form/form.component";
import { ListView } from "../../list-view/list-view.component";

type CategoryCardProps = {
    id?: string;
    name?: string;
}

const CategoryCard = ({ id, name }: CategoryCardProps) => {

    const editModalRef = useRef<ModalRef>();
    const deleteModalRef = useRef<ModalRef>();

    const submitUpdateCategoryForm = (event: FormEvent) => {

    }

    if (id) {
        return (
            <>
                <Modal title="Edit Category" ref={editModalRef}>
                    <Form handleSubmit={submitUpdateCategoryForm}>
                        <FormInput name="name" label="Name" value={name} />
                        <Button type="submit" color="success" text="Update" />
                    </Form>
                </Modal>

                <Modal title="Delete Category" ref={deleteModalRef}>
                    <span style={{ marginBottom: "20px" }}>Are you sure you want to delete Category <b>"{name}"</b>?</span>
                    <Button type="button" color="danger" text="Delete" />
                </Modal>

                <div className={`category-card ${id === null ? "category-card_no-content" : ""}`}>
                    <div className="category-card__header">
                        <div className="category-card__name">{name}</div>

                        <div className="category-card__header-buttons">
                            <Button handleClick={() => { editModalRef.current?.open() }} color="primary" style="outline"><FontAwesomeIcon icon={faEdit} /> <span>{"Edit"}</span></Button>
                            <Button handleClick={() => { deleteModalRef.current?.open() }} color="danger" style="outline"><FontAwesomeIcon icon={faTrash} /></Button>
                        </div>
                    </div>
                    <div className="category-card__content">
                        <div className="category-card__params widget">
                            <div className="widget__title">Parameters</div>
                            <ListView items={null} activeItemId={""} handleClick={() => { }} />
                        </div>
                        <div className="category-card__param-values widget">
                            <div className="widget__title">Parameter values</div>
                            <ListView items={null} activeItemId={""} handleClick={() => { }} />
                        </div>
                        <div className="category-card__image widget">
                            <div className="widget__title">Image</div>
                        </div>
                    </div>
                </div>

            </>
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