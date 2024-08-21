import logo from "@/assets/logo-white.png";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import { IoBagOutline } from "react-icons/io5";
import { useQuotesContext } from "@/context/QuotesProvider";
import QuotesDrawer from "../Quotes/QuotesDrawer";
import MobileMenu from "./MobileMenu";
import { CgMenu } from "react-icons/cg";

function MobileNav() {
  const [showQuote, setShowQuote] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const openNav = () => {
    setShowNav(true);
    setShowQuote(false);
    document.body.style.overflow = "hidden";
  };
  const closeNav = () => {
    document.body.style.overflow = "auto";
    setShowNav(false);
  };
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
      className={`max-w-[1200px] px-4 mx-auto p-3 border-b border-white ${
        scrollY > 100 && "bg-sky-950/80 backdrop-blur-sm "
      }`}>
      <div className="container mx-auto w-full flex flex-wrap gap-3 justify-end text-white mb-4 text-sm">
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
            className="object-cover max-h-10"
          />
        </Link>
        {showNav && <MobileMenu closeNav={closeNav} />}
        <div className="ml-auto grid grid-cols-[1fr_auto_auto] items-center gap-4">
          <Button
            onClick={() => setShowQuote(true)}
            className="w-full !gap-2 !text-base bg-sky-600 hover:bg-sky-500">
            <span className="text-xl">
              <IoBagOutline />
            </span>
            ({quotes.length})
          </Button>
          <button onClick={openNav} className="text-4xl text-sky-50">
            <CgMenu />
          </button>
        </div>
      </header>
      {showQuote && <QuotesDrawer setShowQuote={setShowQuote} />}
    </div>
  );
}

export default MobileNav;
