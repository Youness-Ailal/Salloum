import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function SearchNav() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const submitSearch = e => {
    e.preventDefault();
    if (searchQuery) {
      navigate("/equipments?query=" + searchQuery);
      setSearchQuery("");
    }
  };
  return (
    <div className="relative w-full text-gray-700 lg:min-w-60 xl:min-w-80">
      <form onSubmit={submitSearch}>
        <input
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          type="text"
          placeholder="Search equipment..."
          className="p-2 lg:p-3 lg:pr-14 text-base focus:outline-none rounded-sm w-full h-full"
        />
        <button className="absolute h-full border-l hover:text-gray-600 hover:border-gray-400 border-gray-300 px-2 xl:px-3 right-0 top-1/2 -translate-y-1/2 text-2xl text-gray-500">
          <BiSearch />{" "}
        </button>
      </form>
    </div>
  );
}

export default SearchNav;
