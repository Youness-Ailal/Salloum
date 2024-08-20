import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateEquipmentForm from "./CreateEquipmentForm";

function AddEquipment() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="equipment-form">
          <Button>Add new equipment</Button>
        </Modal.Open>
        <Modal.Window name="equipment-form">
          <CreateEquipmentForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddEquipment;
