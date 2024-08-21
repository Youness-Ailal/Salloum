import { CgClose } from "react-icons/cg";
import BackDrop from "../drawer/BackDrop";
import SearchNav from "../ui/SearchNav";
import { createPortal } from "react-dom";
import { links } from "./Nav";
import { NavLink } from "react-router-dom";

function MobileMenu({ closeNav }: any) {
  return createPortal(
    <>
      <div className="animate-drawer absolute right-0 top-0 z-[999] h-[100dvh] p-6 w-[min(500px,100%)] bg-sky-900 flex flex-col gap-8">
        <button
          onClick={closeNav}
          className="text-4xl bg-sky-950/50 text-sky-50 rounded-sm p-3 self-end">
          <CgClose />
        </button>
        <nav className="flex flex-col gap-8 items-center">
          {links.map(link => (
            <NavLink
              className="py-2 text-xl text-center w-full border-b border-sky-50 text-sky-50"
              to={link.path}>
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="mt-7">
          <SearchNav />
        </div>
      </div>
      <BackDrop onClick={closeNav} />
    </>,
    document.body
  );
}

export default MobileMenu;
