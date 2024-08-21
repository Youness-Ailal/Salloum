import EquipmentItemSkeleton from "./EquipmentItemSkeleton";

function EquipmentsSkeleton() {
  return (
    <div className="grid auto-rows-max grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4 lg:gap-5 mt-5 ">
      {Array.from({ length: 10 }).map((_, i) => (
        <EquipmentItemSkeleton key={i} />
      ))}
    </div>
  );
}

export default EquipmentsSkeleton;
