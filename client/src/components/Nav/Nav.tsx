import logo from "@/assets/logo-white.png";
import { Link, NavLink } from "react-router-dom";
import SearchNav from "../ui/SearchNav";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import { IoBagOutline } from "react-icons/io5";
import { useQuotesContext } from "@/context/QuotesProvider";
import QuotesDrawer from "../Quotes/QuotesDrawer";

type link = {
  name: string;
  path: string;
};
const links: link[] = [
  {
    name: "Equipments to Buy",
    path: "/equipments",
  },
  {
    name: "Sell Equipments",
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
function Nav() {
  const [showQuote, setShowQuote] = useState(false);
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
      className={`container mx-auto p-4 border-b border-white ${
        scrollY > 100 && "bg-sky-950/80 backdrop-blur-sm "
      }`}>
      <div className="container mx-auto w-full flex gap-6 justify-end text-white mb-2 text-sm">
        <a href="mailto:contact@salloumcompany.com" className="hover:underline">
          contact@salloumcompany.com
        </a>
        <a href="tel:+33 6 41 99 43 83" className="hover:underline">
          +33 6 41 99 43 83
        </a>
      </div>
      <header className="flex gap-4 items-center">
        <Link to="/" className="xl:mr-2">
          <img
            src={logo}
            alt="Salloum company"
            className="object-cover max-h-14"
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
        <div className="ml-auto flex items-center gap-4">
          <SearchNav />
          <Button
            onClick={() => setShowQuote(true)}
            className="w-full !gap-2 !text-base bg-sky-600 hover:bg-sky-500">
            <span className="text-xl">
              <IoBagOutline />
            </span>
            Quotes ({quotes.length})
          </Button>
        </div>
      </header>
      {showQuote && <QuotesDrawer setShowQuote={setShowQuote} />}
    </div>
  );
}

export default Nav;
