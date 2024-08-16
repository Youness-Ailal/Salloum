import { BiSearch } from "react-icons/bi";

function SearchNav() {
  return (
    <div className="relative w-full text-gray-700 lg:min-w-60 xl:min-w-80">
      <input
        type="text"
        placeholder="Search equipment..."
        className="p-2 lg:p-3 text-base focus:outline-none rounded-sm w-full h-full"
      />
      <p className="absolute right-2 top-1/2 -translate-y-1/2 text-2xl text-gray-500">
        <BiSearch />{" "}
      </p>
    </div>
  );
}

export default SearchNav;
