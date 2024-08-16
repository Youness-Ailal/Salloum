import { equipment } from "@/utils/constants";
import { RxArrowTopRight } from "react-icons/rx";
import { Link } from "react-router-dom";

function FeaturedEquipmentsItem({ equipment }: { equipment: equipment }) {
  const { name, id, image, description } = equipment;
  return (
    <Link
      to={"equipments/" + id}
      className="flex flex-col gap-4 xl:gap-6 rounded-md ">
      <div>
        <img src={image} alt={name} className="max-h-52 w-full object-cover" />
      </div>
      <div className="p-3 bg-sky-50  lg:p-5 flex flex-col gap-3 xl:gap-5">
        <p className="text-lg xl:text-xl text-gray-800 max-w-72 ">{name} </p>
        <Link
          className="text-sky-900  font-semibold text-xl flex items-center gap-2"
          to={"equipments/" + id}>
          VIEW EQUIPMENT
          <span className="font-bold">
            <RxArrowTopRight />
          </span>
        </Link>
      </div>
    </Link>
  );
}

export default FeaturedEquipmentsItem;
