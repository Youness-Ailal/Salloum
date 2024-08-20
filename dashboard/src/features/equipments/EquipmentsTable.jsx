import Spinner from "../../ui/Spinner";
import { useEquipments } from "./useEquipments";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";
import EquipmentRow from "./EquipmentRow";

function EquipmentsTable() {
  const { isLoading, equipments } = useEquipments();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  // if (!equipments.length) return <Empty resourceName="Equipments" />;

  // 1) FILTER
  const filterValue = searchParams.get("discount") || "all";

  let filteredCabins;
  if (filterValue === "all") filteredCabins = equipments;
  if (filterValue === "no-discount")
    filteredCabins = equipments.filter(cabin => cabin.discount === 0);
  if (filterValue === "with-discount")
    filteredCabins = equipments.filter(cabin => cabin.discount > 0);

  // 2) SORT
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins = filteredCabins.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  return (
    <Menus>
      <Table columns="0.8fr 2.4fr 1fr .5fr 1fr .5fr .4fr  .5fr">
        <Table.Header>
          <div></div>
          <div>Equipment</div>
          <div>Category</div>
          <div>status</div>
          <div>Created At</div>
          <div>Stock</div>
          <div>featured</div>
          <div></div>
          <div></div>
        </Table.Header>

        <Table.Body
          // data={cabins}
          // data={filteredCabins}
          data={sortedCabins}
          render={equipment => (
            <EquipmentRow equipment={equipment} key={equipment.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default EquipmentsTable;
