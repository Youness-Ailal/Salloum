import EquipmentsFilter from "@/components/Equipments/EquipmentsFilter";
import { useEffect, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import EquipmentItem from "@/components/Equipments/EquipmentItem";
import { useSearchParams } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
import Faq from "@/components/ui/Faq";
import CantFind from "@/components/ui/CantFind";
import useEquipments from "@/data/useEquipments";
import EquipmentsSkeleton from "@/components/Equipments/EquipmentsSkeleton";

function Equipments() {
  const { isLoading, equipments: alltempEuipments } = useEquipments();
  // @ts-ignore
  const tempEuipments = alltempEuipments?.filter(item => item.isActive);
  const [equipments, setEquipments] = useState(tempEuipments);
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  const query = search.get("query");
  useEffect(() => {
    console.log(isLoading);

    if (!isLoading) {
      if (query?.length && !category) {
        console.log("im here query");

        const newEquipments = tempEuipments?.filter(item => {
          return (
            //@ts-ignore
            item?.name.toLowerCase().includes(query.toLowerCase()) ||
            //@ts-ignore
            item?.description.toLowerCase().includes(query.toLowerCase()) ||
            //@ts-ignore
            item?.category.toLowerCase().includes(query.toLowerCase())
          );
        });
        setEquipments(newEquipments);
      }
      if (category?.length) {
        console.log("im here category");

        const newEquipments = tempEuipments?.filter(
          //@ts-ignore
          item => item.category === category
        );
        setEquipments(newEquipments);
      }
      if (!query?.length && !category?.length) {
        console.log("heeere");
        console.log(tempEuipments);

        setEquipments(tempEuipments);
      }
    }
  }, [query, category, isLoading]);

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title={"Explore Our Equipments"} />
      <div className="p-2 py-4 lg:py-10 container mx-auto">
        <EquipmentsFilter />
        <div className="grid auto-rows-max grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4 lg:gap-8 mt-5 lg:mt-16">
          {isLoading ? (
            <EquipmentsSkeleton />
          ) : !equipments?.length ? (
            <p className="text-center text-xl lg:text-xl text-sky-900 uppercase font-medium">
              0 Equipments found :(
            </p>
          ) : (
            equipments?.map(item => (
              //@ts-ignore
              <EquipmentItem key={item?.id} className="" equipment={item} />
            ))
          )}
        </div>
      </div>
      <div className="container mx-auto p-2 mt-5 lg:mt-10">
        <CantFind />
      </div>
      <div className="container mx-auto p-2 mt-5 lg:mt-10">
        <Faq />
      </div>
      <div className="mt-5 lg:mt-10">
        <Footer />
      </div>
    </div>
  );
}

export default Equipments;
