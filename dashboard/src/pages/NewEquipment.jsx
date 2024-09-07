import CreateEquipmentForm from "../features/equipments/CreateEquipmentForm";
import Heading from "../ui/Heading";

function NewEquipment() {
  return (
    <>
      <Heading as="h1">Create a new equipment</Heading>
      <CreateEquipmentForm />
    </>
  );
}

export default NewEquipment;
