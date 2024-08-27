import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { BuyTable } from "../features/equipments/BuyTable";
function PurchaseRequests() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Purchase Requests</Heading>
      </Row>

      <Row>
        <BuyTable />
      </Row>
    </>
  );
}

export default PurchaseRequests;
