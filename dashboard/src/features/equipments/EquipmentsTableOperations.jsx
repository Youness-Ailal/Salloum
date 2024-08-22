import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import Input from "../../ui/Input";
import styled from "styled-components";
import { CiSearch } from "react-icons/ci";
import { useSearchParams } from "react-router-dom";

export const Search = styled.div`
  position: relative;
  font-weight: 500;
  font-size: 1.4rem;
  input {
    max-height: 35px;
    padding-right: 28px;
  }
  svg {
    position: absolute;
    pointer-events: none;
    right: 8px;
    font-size: 2rem;
    top: 50%;
    translate: 0 -50%;
  }
`;
function EquipmentsTableOperations() {
  const [searchParams, setSearchParams] = useSearchParams();
  function search(value) {
    if (!value.length) {
      searchParams.delete("search");
    } else {
      searchParams.set("search", value);
    }
    setSearchParams(searchParams);
  }
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "Featured", label: "Featured" },
          { value: "Active", label: "Active" },
          { value: "Inactive", label: "Inactive" },
        ]}
      />
      <Search>
        <Input onChange={e => search(e.target.value)} placeholder="search..." />
        <CiSearch />
      </Search>
    </TableOperations>
  );
}

export default EquipmentsTableOperations;
