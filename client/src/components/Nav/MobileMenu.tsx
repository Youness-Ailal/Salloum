import { CgClose } from "react-icons/cg";
import BackDrop from "../drawer/BackDrop";
import SearchNav from "../ui/SearchNav";
import { createPortal } from "react-dom";
import { links, options } from "./Nav";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import CustomSelect from "../ui/CustomSelect";
import { useProductFilterContext } from "@/context/ProductFilterProvider";

function MobileMenu({ closeNav }: any) {
  const { t, i18n } = useTranslation("translate");
  function handleLanguageChange(lng: "fr" | "en" | "de") {
    //@ts-ignore
    i18n.changeLanguage(lng.value);
  }
  const links = [
    {
      name: t("translate:equipments_to_buy"),
      path: "/equipments",
    },
    {
      name: t("translate:sell_your_equipments"),
      path: "/sell-equipments",
    },
    {
      name: t("translate:services"),
      path: "/services",
    },
    {
      name: t("translate:contact"),
      path: "/contact",
    },
  ];
  const { changeCategory } = useProductFilterContext();
  return createPortal(
    <>
      <div className="animate-drawer fixed right-0 top-0 z-[999] h-[100dvh] p-6 w-[min(500px,100%)] bg-sky-900 flex flex-col gap-8">
        <button
          onClick={closeNav}
          className="text-4xl bg-sky-950/50 text-sky-50 rounded-sm p-3 self-end">
          <CgClose />
        </button>
        <nav className="flex flex-col gap-8 items-center">
          {links.map(link => (
            <NavLink
              onClick={closeNav}
              className="py-2 text-xl text-center w-full border-b border-sky-50 text-sky-50"
              to={link.path}>
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="mt-7 grid grid-cols-[1fr_auto] justify-center items-center gap-4">
          <SearchNav closeNav={closeNav} />
          <div className="">
            <CustomSelect
              //@ts-ignore
              onChange={handleLanguageChange}
              options={options}
            />
          </div>
        </div>

        <div className="flex items-center gap-5 justify-between flex-wrap text-sky-50 mt-auto">
          <a
            href="mailto:contact@salloumcompany.com"
            className="hover:underline">
            contact@salloumcompany.com
          </a>
          <a href="tel:+33 6 41 99 43 83" className="hover:underline">
            +33 6 41 99 43 83
          </a>
        </div>
      </div>
      <BackDrop onClick={closeNav} />
    </>,
    document.body
  );
}

export default MobileMenu;
