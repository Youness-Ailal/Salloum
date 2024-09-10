import Skeleton from "react-loading-skeleton";

function EquipmentsSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton className="h-32 w-full lg:h-48" />
      ))}
    </div>
  );
}

export default EquipmentsSkeleton;
