import { categories, featuredEquipments } from "@/utils/constants";
import { Air } from "@/assets/icons/Air";
import { Boilers } from "@/assets/icons/Boilers";
import { Cooling } from "@/assets/icons/Cooling";
import { Food } from "@/assets/icons/Food";
import { Generators } from "@/assets/icons/Generators";
import { Pumps } from "@/assets/icons/Pumps";
import { Tool } from "@/assets/icons/Tool";
import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";

const icons = {
  cooling: <Cooling />,
  generators: <Generators />,
  boilers: <Boilers />,
  "food machinery": <Food />,
  "air compressors": <Air />,
  "machine tool": <Tool />,
  "pumps & electric motor": <Pumps />,
};
function EquipmentsFilter({ setCategory, category }) {
  const equipments = featuredEquipments;
  const [search, setSearch] = useSearchParams();
  return (
    <>
      <p className="mb-2 text-lg text-sky-900 font-medium">
        FILTER BY CATEGORY
      </p>
      <div className="justify-center border-y py-2 lg:py-5 border-s-sky-950/50 flex items-center flex-wrap gap-4 px-4">
        {categories?.map(item => (
          <button
            key={item.id}
            className={cn(
              "flex hover:bg-sky-700 hover:text-white text-sky-900 items-center gap-2 transition rounded-sm py-2 px-4 border border-sky-700",
              {
                "bg-sky-700 text-white": category === item.id,
              }
            )}
            onClick={() => {
              setCategory(prev => (prev === item.id ? "" : item.id));
              search.delete("query");
              setSearch(search);
            }}>
            <span className="text-xl xl:text-2xl">
              {icons[item.name.toLocaleLowerCase()] || "..."}
            </span>
            {item.name}
          </button>
        ))}
        <button
          className={cn(
            "flex hover:bg-sky-700 hover:text-white text-sky-900 items-center gap-2 transition rounded-sm py-2 px-4 border border-sky-700"
          )}
          onClick={() => {
            setCategory("");
            search.delete("query");
            setSearch(search);
          }}>
          All Items ({equipments?.length})
        </button>
      </div>
    </>
  );
}

export default EquipmentsFilter;
