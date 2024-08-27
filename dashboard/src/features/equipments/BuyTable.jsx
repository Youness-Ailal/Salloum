import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

import BuyRow from "./BuyRow";
import { useBuyEquipmentsRequests } from "./useBuyEquipmentsRequests";

export function BuyTable() {
  const { isLoading, data } = useBuyEquipmentsRequests();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  // if (!data.length) return <Empty resourceName="Buy Request" />;

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
      <Table columns="0.8fr 1fr .8fr 1fr 1.5fr 1fr 1fr .5fr">
        <Table.Header>
          <div></div>
          <div>FROM</div>
          <div>Equipments</div>
          <div>Phone</div>
          <div>Email</div>
          <div>Entreprise</div>
          <div>Date</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedEquipments}
          render={equipment => (
            <BuyRow equipment={equipment} key={equipment.id} />
          )}
        />
      </Table>
    </Menus>
  );
}
