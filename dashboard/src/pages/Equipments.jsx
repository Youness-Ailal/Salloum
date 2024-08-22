import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddEquipment from "../features/equipments/AddEquipment";
import EquipmentsTable from "../features/equipments/EquipmentsTable";
import EquipmentsTableOperations from "../features/equipments/EquipmentsTableOperations";

function Equipments() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All equipments</Heading>
        <EquipmentsTableOperations />
      </Row>

      <Row>
        <AddEquipment />
        <EquipmentsTable />
      </Row>
    </>
  );
}

export default Equipments;
