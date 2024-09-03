import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import UpdateCategoriesForm from "./UpdateCategoriesForm";

function Categories() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="categories-form">
          <Button>Update Catgories</Button>
        </Modal.Open>
        <Modal.Window name="categories-form">
          <UpdateCategoriesForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default Categories;
