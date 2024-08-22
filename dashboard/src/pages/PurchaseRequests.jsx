import Heading from "../ui/Heading";
import Row from "../ui/Row";
import EquipmentsTableOperations from "../features/equipments/EquipmentsTableOperations";
import BuyTable from "../features/equipments/buyTable";

function PurchaseRequests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Purchase Requests</Heading>
        {/* <EquipmentsTableOperations /> */}
      </Row>

      <Row>
        <BuyTable />
      </Row>
    </>
  );
}

export default PurchaseRequests;
