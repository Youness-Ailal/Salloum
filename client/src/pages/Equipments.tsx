import EquipmentsFilter from "@/components/Equipments/EquipmentsFilter";
import { useEffect, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { featuredEquipments } from "@/utils/constants";
import EquipmentItem from "@/components/ui/EquipmentItem";
import { useSearchParams } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
import Faq from "@/components/ui/Faq";
import CantFind from "@/components/ui/CantFind";

function Equipments() {
  const tempEuipments = featuredEquipments;
  const [category, setCategory] = useState("");
  const [equipments, setEquipments] = useState(tempEuipments);
  const [search, setSearch] = useSearchParams();
  const query = search.get("query");
  useEffect(() => {
    if (query && !category) {
      const newEquipments = tempEuipments?.filter(item => {
        return (
          item?.name.toLowerCase().includes(query.toLowerCase()) ||
          item?.description.toLowerCase().includes(query.toLowerCase()) ||
          item?.category.toLowerCase().includes(query.toLowerCase())
        );
      });
      setEquipments(newEquipments);
    }
    if (category) {
      console.log(category);

      const newEquipments = tempEuipments?.filter(
        item => item.category === category
      );
      setEquipments(newEquipments);
    }
    if (!query && !category) {
      setEquipments(tempEuipments);
    }
  }, [query, category]);
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title={"Explore Our Equipments"} />
      <div className="p-2 py-4 lg:py-10 container mx-auto">
        <EquipmentsFilter category={category} setCategory={setCategory} />
        <div className="grid auto-rows-max grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-4 lg:gap-8 mt-5 lg:mt-16">
          {!equipments?.length ? (
            <p className="text-center text-xl lg:text-xl text-sky-900 uppercase font-medium">
              0 Equipments found :(
            </p>
          ) : (
            equipments.map(item => (
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
