import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddEquipment from "../features/equipments/AddEquipment";
import EquipmentsTable from "../features/equipments/EquipmentsTable";
import EquipmentsTableOperations from "../features/equipments/EquipmentsTableOperations";
import MessagesTable from "../features/messages/MessagesTable";

function Contacts() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Contact messages</Heading>
      </Row>

      <Row>
        <MessagesTable />
      </Row>
    </>
  );
}

export default Contacts;
