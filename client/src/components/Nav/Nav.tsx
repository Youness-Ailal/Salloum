import logo from "@/assets/logo-white.png";
import { Link, NavLink } from "react-router-dom";
import SearchNav from "../ui/SearchNav";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import { IoBagOutline } from "react-icons/io5";
import { useQuotesContext } from "@/context/QuotesProvider";
import QuotesDrawer from "../Quotes/QuotesDrawer";
import { FranceIcon } from "@/assets/icons/FranceIcon";
import { GermanyIcon } from "@/assets/icons/GermanyIcon";
import { EnglishFlag } from "@/assets/icons/EnglishFlag";
import CustomSelect from "../ui/CustomSelect";
import { useTranslation } from "react-i18next";
interface OptionType {
  value: string;
  label: JSX.Element;
  icon: JSX.Element;
}

export const options: OptionType[] = [
  {
    value: "fr",
    label: <FranceIcon className="text-xl" />,
    icon: <FranceIcon />,
  },
  {
    value: "de",
    label: <GermanyIcon className="text-xl" />,
    icon: <GermanyIcon />,
  },
  {
    value: "en",
    label: <EnglishFlag className="text-xl" />,
    icon: <EnglishFlag />,
  },
];
type link = {
  name: string;
  path: string;
};
export const links: link[] = [
  {
    name: "Equipments to Buy",
    path: "/equipments",
  },
  {
    name: "Sell Your Equipments",
    path: "/sell-equipments",
  },
  {
    name: "Services",
    path: "/services",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];
function Nav({ scrollYValue = 100 }) {
  const { t, i18n } = useTranslation(["translate"]);
  const links: link[] = [
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
  const [showQuote, setShowQuote] = useState(false);
  function handleLanguageChange(lng: "fr" | "en" | "de") {
    //@ts-ignore
    i18n.changeLanguage(lng.value);
  }
  useEffect(() => {
    if (showQuote) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showQuote]);
  const [scrollY, setScrollY] = useState(0);
  const { quotes } = useQuotesContext();

  useEffect(() => {
    const changeScrollY = () => {
      setScrollY(window.scrollY);
    };
    document.addEventListener("scroll", changeScrollY);

    return () => document.removeEventListener("scroll", changeScrollY);
  }, []);

  return (
    <div
      className={`max-w-[1600px] mx-auto py-3 px-4 border-b border-white ${
        scrollY > scrollYValue && "bg-sky-950/80 backdrop-blur-sm "
      }`}>
      <div className="container mx-auto w-full  flex gap-6 justify-end items-start text-white mb-2 text-sm">
        <a href="mailto:contact@salloumcompany.com" className="hover:underline">
          contact@salloumcompany.com
        </a>
        <a href="tel:+33 6 41 99 43 83" className="hover:underline">
          +33 6 41 99 43 83
        </a>
        <div className="flex items-start gap-2 z-50 -translate-y-2">
          <CustomSelect
            //@ts-ignore
            onChange={handleLanguageChange}
            options={options}
          />
        </div>
      </div>
      <header className="flex gap-4 items-center">
        <Link to="/" className="xl:mr-2">
          <img
            src={logo}
            alt="Salloum company"
            className="object-cover max-h-7 lg:max-h-10"
          />
        </Link>
        <nav className="flex items-center gap-4 xl:gap-6  text-white font-medium ml-2 lg:ml-6">
          {links.map(item => (
            <NavLink
              key={item.name}
              className="hover:text-sky-400 transition"
              to={item.path}>
              {" "}
              {item.name}{" "}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto grid grid-cols-[1fr_auto] items-center gap-4">
          <SearchNav />
          <Button
            onClick={() => setShowQuote(true)}
            className=" !gap-2 !text-base bg-sky-600 hover:bg-sky-500">
            <span className="text-xl">
              <IoBagOutline />
            </span>
            ({quotes.length})
          </Button>
        </div>
      </header>
      {showQuote && <QuotesDrawer setShowQuote={setShowQuote} />}
    </div>
  );
}

export default Nav;
