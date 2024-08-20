import Header from "../ui/Header";
import EquipmentItemSkeleton from "./EquipmentItemSkeleton";

function FeaturedEquipmentsSkeleton() {
  return (
    <div>
      <Header title1={"Browse Our"} title2={"Featured Equipments"} />
      <div className="mt-6 xl:mt-12 pb-10 xl:pb-14 flex gap-4 overflow-x-hidden">
        {Array.from({ length: 8 })?.map(_ => (
          <EquipmentItemSkeleton />
        ))}
      </div>
    </div>
  );
}

export default FeaturedEquipmentsSkeleton;
