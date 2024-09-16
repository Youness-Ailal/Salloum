import Header from "./Header";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useCategories from "@/data/useCategories";
import { Icon } from "@iconify-icon/react";

function Categories() {
  const { t } = useTranslation(["translate"]);
  const categoriesTranslation = t("categories", { returnObjects: true });

  const { categoriesApi } = useCategories();
  const categories = categoriesApi?.map(item => ({
    name: item.category,
    id: item.id,
    icon: item.icon,
  }));
  return (
    <div className="">
      <Header title1={t("translate:check")} title2={t("translate:top")} />
      <div className="flex flex-wrap gap-5 xl:gap-9 items-center justify-center mt-4 xl:mt-7">
        {categories?.map(item => (
          <Link
            key={item.id}
            to={"/equipments?category=" + item.id}
            className="text-lg xl:text-xl text-sky-950 font-medium uppercase p-4 xl:p-7 shadow-md bg-sky-50 text-center flex flex-col items-center justify-center gap-3  xl:gap-5 h-32 w-44 xl:w-60 xl:h-52 hover:shadow-xl border border-sky-100 rounded-sm">
            <span className="text-3xl xl:text-5xl text-sky-700">
              <Icon icon={item.icon} />
            </span>
            {
              //@ts-ignore
              categoriesTranslation[item.name] || item.name
            }
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
