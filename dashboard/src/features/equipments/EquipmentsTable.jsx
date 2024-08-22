import Spinner from "../../ui/Spinner";
import { useEquipments } from "./useEquipments";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import EquipmentRow from "./EquipmentRow";
import { useEffect } from "react";
import { useState } from "react";

function EquipmentsTable() {
  const { isLoading, equipments } = useEquipments();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredEquipments, setFilteredEquipments] = useState([]);

  const filterValue = searchParams.get("status") || "all";
  const search = searchParams.get("search");

  useEffect(() => {
    if (!isLoading) {
      if (filterValue === "all") {
        setFilteredEquipments(equipments);
      }
      if (filterValue === "Active")
        setFilteredEquipments(equipments.filter(item => item.isActive));
      if (filterValue === "Featured")
        setFilteredEquipments(equipments.filter(item => item.isFeatured));
      if (filterValue === "Inactive")
        setFilteredEquipments(equipments.filter(item => !item.isActive));
      if (search?.length) {
        searchParams.delete("status");
        setSearchParams(searchParams);
        setFilteredEquipments(
          equipments.filter(
            item =>
              item.name?.toLowerCase().includes(search.toLowerCase()) ||
              item.description?.toLowerCase().includes(search.toLowerCase()) ||
              item.category?.toLowerCase().includes(search.toLowerCase())
          )
        );
      }
    }
  }, [search, filterValue, isLoading]);
  if (isLoading) return <Spinner />;

  return (
    <Menus>
      <Table columns="0.8fr 2.2fr 1.2fr .5fr 1fr .5fr .4fr  .5fr">
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
          data={filteredEquipments}
          render={equipment => (
            <EquipmentRow equipment={equipment} key={equipment.id} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default EquipmentsTable;
