import FontAwesome from "react-fontawesome";
import "./category-card.style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../_common/button/button.component";
import Modal from "../../modal/modal.component";
import { FormEvent, useState } from "react";
import FormInput from "../../../form/form-input/form-input.component";
import Form from "../../../form/form/form.component";

type CategoryCardProps = {
    id?: string;
    name?: string;
}

const CategoryCard = ({ id, name }: CategoryCardProps) => {
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const submitUpdateCategoryForm = (event: FormEvent) => {

    }

    if (id) {
        return (
            <>
                <Modal onClose={() => { setEditModalOpen(false); }}  isOpen={editModalOpen} title="Edit Category">
                    <Form handleSubmit={submitUpdateCategoryForm}>
                        <FormInput name="name" label="Name" />
                        <Button type="submit" style="success" text="Update" />
                    </Form>
                </Modal>

                <Modal onClose={() => { setDeleteModalOpen(false); }} isOpen={deleteModalOpen} title="Delete Category">
                    <span style={{ marginBottom: "20px" }}>Are you sure you want to delete Category <b>"{name}"</b>?</span>
                    <Button type="button" style="danger" text="Delete" />
                </Modal>

                <div className={`category-card ${id === null ? "category-card_no-content" : ""}`}>
                    <div className="category-card__header">
                        <div className="category-card__name">{name}</div>

                        <div className="category-card__header-buttons">
                            <Button handleClick={() => { setEditModalOpen(true) }} style={["primary", "outline"]}><FontAwesomeIcon icon={faEdit} /> <span>{"Edit"}</span></Button>
                            <Button handleClick={() => { setDeleteModalOpen(true) }} style={["danger", "outline"]}><FontAwesomeIcon icon={faTrash} /></Button>
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