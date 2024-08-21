import MobileNav from "@/components/Nav/MobileNav";
import Nav from "@/components/Nav/Nav";
import { cn } from "@/lib/utils";
import { addPageView } from "@/services/api";
import { getCountry } from "@/utils/helpers";
import { differenceInHours } from "date-fns";
import { useEffect } from "react";
//@ts-ignore
import Headroom from "react-headroom";
import { useMediaQuery } from "react-responsive";

//@ts-expect-error children
function MainLayout({ children, heightMobile = "80vh", height = "70vh" }) {
  const url = window.location.href;
  const isSmall = useMediaQuery({
    maxWidth: 1200,
  });
  const NavHeader = isSmall ? <MobileNav /> : <Nav />;

  useEffect(() => {
    const viewedTime = localStorage.getItem("visited-at");

    async function setVist() {
      const country = getCountry();
      await addPageView(country);
    }
    if (viewedTime) {
      const viewedDate = new Date(viewedTime);
      const hrsDiff = differenceInHours(new Date(), viewedDate);
      hrsDiff >= 24 ? setVist() : null;
    } else {
      localStorage.setItem("visited-at", new Date().toString());
      setVist();
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [url]);
  return (
    <div className="flex flex-col relative">
      <div
        className={cn(`hero-bg flex flex-col`)}
        style={{
          minHeight: heightMobile,
          //@ts-expect-error minWidth
          ["@media (min-width: 1024px)"]: {
            minHeight: height,
          },
        }}>
        <Headroom style={{ zIndex: 99 }}>{NavHeader}</Headroom>
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
