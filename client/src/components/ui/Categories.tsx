import { categories } from "@/utils/constants";
import Header from "./Header";
import { Link } from "react-router-dom";
import { Cooling } from "@/assets/icons/Cooling";
import { Generators } from "@/assets/icons/Generators";
import { Boilers } from "@/assets/icons/Boilers";
import { Food } from "@/assets/icons/Food";
import { Air } from "@/assets/icons/Air";
import { Tool } from "@/assets/icons/Tool";
import { Pumps } from "@/assets/icons/Pumps";
const icons = {
  cooling: <Cooling />,
  generators: <Generators />,
  boilers: <Boilers />,
  "food machinery": <Food />,
  "air compressors": <Air />,
  "machine tool": <Tool />,
  "pumps & electric motor": <Pumps />,
};

function Categories() {
  return (
    <div className="">
      <Header title1={"Check Our"} title2={"Top Categories"} />
      <div className="flex flex-wrap gap-5 xl:gap-9 items-center justify-center mt-4 xl:mt-7">
        {categories?.map(item => (
          <Link
            to={"equipments?category=" + item.id}
            className="text-lg xl:text-xl text-sky-950 font-medium uppercase p-4 xl:p-7 shadow-md bg-sky-50 text-center flex flex-col items-center justify-center gap-3  xl:gap-5 h-32 w-44 xl:w-60 xl:h-52 hover:shadow-xl border border-sky-100 rounded-sm">
            <span className="text-3xl xl:text-5xl text-sky-700">
              {icons[item.name.toLocaleLowerCase()] || "..."}
            </span>
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
