import Heading from "../ui/Heading";
import Row from "../ui/Row";
import EquipmentsTableOperations from "../features/equipments/EquipmentsTableOperations";
import SellTable from "../features/equipments/SellTable";

function SellRequests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Sell Requests</Heading>
        {/* <EquipmentsTableOperations /> */}
      </Row>

      <Row>
        <SellTable />
      </Row>
    </>
  );
}

export default SellRequests;
