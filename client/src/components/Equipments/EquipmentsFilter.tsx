import { cn } from "@/lib/utils";
import { useSearchParams } from "react-router-dom";
import useEquipments from "@/data/useEquipments";
import Skeleton from "react-loading-skeleton";
import useCategories from "@/data/useCategories";
import { Icon } from "@iconify-icon/react";
import { useTranslation } from "react-i18next";

function EquipmentsFilter({
  filterSubcategories,
  setFilterSubcategories,
  filterSubSubcategories,
  setFilterSubSubcategories,
  conditionFilter,
  setConditionFilter,
  stockStatus,
  setStockStatus,
}) {
  const { t } = useTranslation("translate");
  const categoriesTranslation = t("categories", { returnObjects: true });
  const { equipments } = useEquipments();
  const { categoriesApi, categoriesLoading } = useCategories();
  const categories = categoriesApi?.map(item => ({
    name: item.category,
    icon: item.icon,
    id: item.id,
  }));

  function addSubSubcategory(name: string) {
    setFilterSubSubcategories(prev => [...prev, name]);
  }
  function removeSubSubcategory(name: string) {
    setFilterSubSubcategories(prev => [...prev.filter(item => item !== name)]);
  }
  function addSubcategory(name: string) {
    setFilterSubcategories(prev => [...prev, name]);
  }
  function removeSubcategory(name: string) {
    setFilterSubcategories(prev => [...prev.filter(item => item !== name)]);
  }

  const subCategories = categoriesApi?.flatMap(item => item?.subCategories);
  const subSubCategories = categoriesApi?.flatMap(
    item => item?.subSubCategories
  );

  const [search, setSearch] = useSearchParams();
  const category = search.get("category");
  if (categoriesLoading) return <FilterSkeleton />;
  return (
    <div className="flex flex-col gap-2 sticky top-6 pr-5 border-r border-s-sky-950/50">
      <p className="text-lg text-sky-900 font-medium">{t("by_category")}</p>
      <div className="flex-col border-y lg:py-5 border-s-sky-950/50 flex flex-wrap gap-4">
        {categories?.map(item => (
          <button
            key={item.id}
            className={cn(
              "flex hover:bg-sky-700 hover:text-white text-sky-900 items-center gap-2 transition rounded-sm py-2 px-4 border border-sky-700",
              {
                "bg-sky-700 text-white": category === item.name,
              }
            )}
            onClick={() => {
              // setCategory(prev => (prev === item.id ? "" : item.id));
              if (category !== item.name) {
                search.set("category", item.name);
                setFilterSubcategories([]);
                setFilterSubSubcategories([]);
                search.delete("query");
                setSearch(search);
              } else {
                search.delete("category");
                setSearch(search);
              }
            }}>
            <span className="text-xl xl:text-2xl">
              <Icon icon={item.icon} />
            </span>
            {
              //@ts-ignore
              categoriesTranslation[item.name] || item.name
            }
          </button>
        ))}
        <button
          className={cn(
            "flex hover:bg-sky-700 hover:text-white text-sky-900 items-center gap-2 transition rounded-sm py-2 px-4 border border-sky-700"
          )}
          onClick={() => {
            search.delete("category");
            search.delete("query");
            setSearch(search);
          }}>
          {t("all_items")} ({equipments?.filter(item => item.isActive).length})
        </button>
      </div>
      <p className="text-lg text-sky-900 font-medium">{t("by_condition")}</p>
      <div className="flex-col border-y lg:py-5 border-s-sky-950/50 flex flex-wrap gap-4">
        <button
          className={cn(
            "flex hover:bg-sky-700 hover:text-white text-sky-900 items-center gap-2 transition rounded-sm py-1 px-3 border border-sky-700",
            {
              "bg-sky-700 text-white": conditionFilter === "new",
            }
          )}
          onClick={() =>
            setConditionFilter(prev => (prev === "new" ? "" : "new"))
          }>
          {t("new")}
        </button>
        <button
          className={cn(
            "flex hover:bg-sky-700 hover:text-white text-sky-900 items-center gap-2 transition rounded-sm py-1 px-3 border border-sky-700",
            {
              "bg-sky-700 text-white": conditionFilter === "used",
            }
          )}
          onClick={() =>
            setConditionFilter(prev => (prev === "used" ? "" : "used"))
          }>
          {t("used")}
        </button>
        <button
          className={cn(
            "flex hover:bg-sky-700 hover:text-white text-sky-900 items-center gap-2 transition rounded-sm py-1 px-3 border border-sky-700",
            {
              "bg-sky-700 text-white": conditionFilter === "refurbished",
            }
          )}
          onClick={() =>
            setConditionFilter(prev =>
              prev === "refurbished" ? "" : "refurbished"
            )
          }>
          {t("refurbished")}
        </button>
      </div>
      <p className="text-lg text-sky-900 font-medium">{t("by_status")}</p>
      <div className="flex-col border-y lg:py-5 border-s-sky-950/50 flex flex-wrap gap-4">
        <button
          className={cn(
            "flex hover:bg-sky-700 hover:text-white text-sky-900 items-center gap-2 transition rounded-sm py-1 px-3 border border-sky-700",
            {
              "bg-sky-700 text-white": stockStatus === "in stock",
            }
          )}
          onClick={() =>
            setStockStatus(prev => (prev === "in stock" ? "" : "in stock"))
          }>
          {t("stock_in")}
        </button>
        <button
          className={cn(
            "flex hover:bg-sky-700 hover:text-white text-sky-900 items-center gap-2 transition rounded-sm py-1 px-3 border border-sky-700",
            {
              "bg-sky-700 text-white": stockStatus === "out of stock",
            }
          )}
          onClick={() =>
            setStockStatus((prev: string) =>
              prev === "out of stock" ? "" : "out of stock"
            )
          }>
          {t("stock_out")}
        </button>
      </div>

      <p className="text-lg text-sky-900 font-medium">{t("by_sub")}</p>
      <div className="border-y text-sm lg:py-5 border-s-sky-950/50 flex flex-wrap gap-4">
        {subCategories?.map(item => (
          <button
            key={item}
            className={cn(
              "flex hover:bg-sky-700 hover:text-white text-sky-900 items-center gap-2 transition rounded-sm py-1 px-3 border border-sky-700",
              {
                "bg-sky-700 text-white": filterSubcategories.includes(item),
              }
            )}
            onClick={() => {
              // setCategory(prev => (prev === item.id ? "" : item.id));
              if (!filterSubcategories.includes(item)) {
                addSubcategory(item);
              } else {
                removeSubcategory(item);
              }
            }}>
            {item}
          </button>
        ))}
        {/* <button
          className={cn(
            "flex hover:bg-sky-700 hover:text-white text-sky-900 items-center gap-2 transition rounded-sm py-2 px-4 border border-sky-700"
          )}
          onClick={() => {
            setFilterSubcategories([]);
          }}>
          All Sub categories
        </button> */}
      </div>
      <p className="text-lg text-sky-900 font-medium">{t("by_subSub")}</p>
      <div className="border-y text-sm lg:py-5 border-s-sky-950/50 flex flex-wrap gap-4">
        {subSubCategories?.map(item => (
          <button
            key={item}
            className={cn(
              "flex hover:bg-sky-700 hover:text-white text-sky-900 items-center gap-2 transition rounded-sm py-1 px-3 border border-sky-700",
              {
                "bg-sky-700 text-white": filterSubSubcategories.includes(item),
              }
            )}
            onClick={() => {
              // setCategory(prev => (prev === item.id ? "" : item.id));
              if (!filterSubSubcategories.includes(item)) {
                addSubSubcategory(item);
              } else {
                removeSubSubcategory(item);
              }
            }}>
            {item}
          </button>
        ))}
        {/* <button
          className={cn(
            "flex hover:bg-sky-700 hover:text-white text-sky-900 items-center gap-2 transition rounded-sm py-2 px-4 border border-sky-700"
          )}
          onClick={() => {
            setFilterSubSubcategories([]);
          }}>
          All Sub Sub-categories
        </button> */}
      </div>
    </div>
  );
}

export default EquipmentsFilter;

function FilterSkeleton() {
  const { t } = useTranslation("translate");
  return (
    <div className="flex flex-col gap-2 sticky top-6 self-start">
      <p className="text-lg text-sky-900 font-medium">{t("by_category")}</p>
      <div className="flex-col border-y lg:py-5 border-s-sky-950/50 flex flex-wrap gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="w-full h-8" />
        ))}
      </div>
    </div>
  );
}
