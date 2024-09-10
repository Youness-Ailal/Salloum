import EquipmentsFilter from "@/components/Equipments/EquipmentsFilter";
import { useEffect, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import { useSearchParams } from "react-router-dom";
import Footer from "@/components/Footer/Footer";
import Faq from "@/components/ui/Faq";
import useEquipments from "@/data/useEquipments";
import EquipmentsSkeleton from "@/components/Equipments/EquipmentsSkeleton";
import EquipmentItemY from "@/components/Equipments/EquipmentItemY";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { ImFilter } from "react-icons/im";
import Drawer from "@/components/drawer/Drawer";
import SellMachineBanner from "@/components/ui/SellMachineBanner";

function Equipments() {
  const { isLoading, equipments: alltempEuipments } = useEquipments();
  const isSmallScreen = useMediaQuery({
    maxWidth: 1000,
  });
  const [showFilters, setShowFilters] = useState(false);
  // @ts-ignore
  const tempEquipments = alltempEuipments?.filter(item => item.isActive);
  const [equipments, setEquipments] = useState(tempEquipments);
  const [search, setSearch] = useSearchParams();
  const category = search.get("category");

  const query = search.get("query");
  const { t } = useTranslation("translate");

  const [filterSubcategories, setFilterSubcategories] = useState<string[]>([]);
  const [filterSubSubcategories, setFilterSubSubcategories] = useState<
    string[]
  >([]);
  const [conditionFilter, setConditionFilter] = useState("");
  const [stockStatus, setStockStatus] = useState("");

  useEffect(() => {
    if (!isLoading) {
      let filteredEquipments = tempEquipments;

      // Apply query-based filtering
      if (query) {
        const lowercasedQuery = query.toLowerCase();
        filteredEquipments = filteredEquipments?.filter(
          item =>
            item.name.toLowerCase().includes(lowercasedQuery) ||
            item.description.toLowerCase().includes(lowercasedQuery) ||
            item.brand.toLowerCase().includes(lowercasedQuery) ||
            item.category.toLowerCase().includes(lowercasedQuery)
        );
      }

      // Apply category-based filtering
      if (category) {
        filteredEquipments = filteredEquipments?.filter(
          item => item.category.toLowerCase() === category.toLowerCase()
        );
      }

      // Apply subcategory filtering
      if (filterSubcategories.length > 0) {
        filteredEquipments = filteredEquipments?.filter(item =>
          filterSubcategories.includes(item.subcategory)
        );
      }

      // Apply subsubcategory filtering
      if (filterSubSubcategories.length > 0) {
        filteredEquipments = filteredEquipments?.filter(item =>
          filterSubSubcategories.includes(item.subsubcategory)
        );
      }

      // Apply condition-based filtering
      if (conditionFilter) {
        filteredEquipments = filteredEquipments?.filter(
          item => item.condition.toLowerCase() === conditionFilter.toLowerCase()
        );
      }
      if (stockStatus) {
        filteredEquipments = filteredEquipments?.filter(
          item => item.stock.toLowerCase() === stockStatus.toLowerCase()
        );
      }

      // Set the filtered equipment list
      setEquipments(filteredEquipments);
    }
  }, [
    query,
    category,
    stockStatus,
    filterSubcategories,
    filterSubSubcategories,
    conditionFilter,
    isLoading,
  ]);

  if (isSmallScreen)
    return (
      <div className="min-h-screen flex flex-col">
        <PageHeader title={t("explore_our_equipments")} />
        <div className="p-2 py-4 lg:py-10 w-[min(1500px,100%)] mx-auto">
          <button
            onClick={() => setShowFilters(true)}
            className="text-sky-50 flex items-center rounded-sm gap-4 uppercase text-lg my-6 py-2 px-6 bg-sky-800">
            Filter options
            <ImFilter />
          </button>
          {showFilters && (
            <Drawer
              title=""
              subTitle=""
              onClose={() => setShowFilters(false)}
              handleClick={() => setShowFilters(false)}
              buttonName="APPLY FILTERS">
              <div className="py-8">
                <EquipmentsFilter
                  filterSubcategories={filterSubcategories}
                  setFilterSubcategories={setFilterSubcategories}
                  filterSubSubcategories={filterSubSubcategories}
                  setFilterSubSubcategories={setFilterSubSubcategories}
                  conditionFilter={conditionFilter}
                  setConditionFilter={setConditionFilter}
                  stockStatus={stockStatus}
                  setStockStatus={setStockStatus}
                />
              </div>
            </Drawer>
          )}
          <div className="flex flex-col gap-8 ">
            {isLoading ? (
              <EquipmentsSkeleton />
            ) : !equipments?.length ? (
              <p className="text-center text-xl lg:text-xl text-sky-900 uppercase font-medium">
                0 Equipments found :(
              </p>
            ) : (
              equipments?.map(item => (
                //@ts-ignore
                <EquipmentItemY key={item?.id} className="" equipment={item} />
              ))
            )}
          </div>
        </div>
        <div className="container mx-auto p-2 mt-5 lg:mt-10">
          <SellMachineBanner />
        </div>
        <div className="container mx-auto p-2 mt-5 lg:mt-10">
          <Faq />
        </div>
        <div className="mt-5 lg:mt-10">
          <Footer />
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title={t("explore_our_equipments")} />
      <div className="p-2 py-4 grid grid-cols-[300px_1fr] gap-8 lg:gap-14 lg:py-10 w-[min(1500px,100%)] mx-auto">
        <EquipmentsFilter
          filterSubcategories={filterSubcategories}
          setFilterSubcategories={setFilterSubcategories}
          filterSubSubcategories={filterSubSubcategories}
          setFilterSubSubcategories={setFilterSubSubcategories}
          conditionFilter={conditionFilter}
          setConditionFilter={setConditionFilter}
          stockStatus={stockStatus}
          setStockStatus={setStockStatus}
        />
        <div className="flex flex-col gap-8 ">
          {isLoading ? (
            <EquipmentsSkeleton />
          ) : !equipments?.length ? (
            <p className="text-center text-xl lg:text-xl text-sky-900 uppercase font-medium">
              0 Equipments found :(
            </p>
          ) : (
            equipments?.map(item => (
              //@ts-ignore
              <EquipmentItemY key={item?.id} className="" equipment={item} />
            ))
          )}
        </div>
      </div>
      <div className="container mx-auto p-2 mt-5 lg:mt-10">
        <SellMachineBanner />
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
