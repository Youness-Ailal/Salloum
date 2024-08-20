import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

import { useSellEquipmentsRequests } from "./useSellEquipmentsRequests";
import SellRow from "./SellRow";

function SellTable() {
  const { isLoading, data } = useSellEquipmentsRequests();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  // if (!data.length) return <Empty resourceName="Sell Requests" />;

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredRequests;
  if (filterValue === "all") filteredRequests = data;
  if (filterValue === "no-discount")
    filteredRequests = data.filter(cabin => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredRequests = data.filter(cabin => cabin.discount > 0);

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedEquipments = filteredRequests.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.8fr 1.8fr 1fr 1fr 1.5fr .6fr 1fr .1fr">
        <Table.Header>
          <div></div>
          <div>Equipment</div>
          <div>FROM</div>
          <div>Phone</div>
          <div>Email</div>
          <div>Price</div>
          <div>Date</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedEquipments}
          render={equipment => (
            <SellRow equipment={equipment} key={equipment.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default SellTable;
