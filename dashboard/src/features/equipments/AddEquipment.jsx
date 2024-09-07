import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
// import Modal from "../../ui/Modal";
import CreateEquipmentForm from "./CreateEquipmentForm";

function AddEquipment() {
  const navigate = useNavigate();
  const goToAdd = () => navigate("/equipments/new");
  return (
    <div>
      <Button onClick={goToAdd}>Add new equipment</Button>
    </div>
  );
}

export default AddEquipment;
