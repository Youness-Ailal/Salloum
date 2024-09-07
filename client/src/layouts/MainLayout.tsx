import MobileNav from "@/components/Nav/MobileNav";
import Nav from "@/components/Nav/Nav";
import { cn } from "@/lib/utils";
import { addPageView } from "@/services/api";
import { getCountry } from "@/utils/helpers";
import { differenceInHours } from "date-fns";
import { useEffect } from "react";
//@ts-ignore
// import Headroom from "react-headroom";
import { useMediaQuery } from "react-responsive";

//@ts-expect-error children
function MainLayout({ children, heightMobile = "80vh", height = "70vh" }) {
  const url = window.location.href;
  const isSmall = useMediaQuery({
    maxWidth: 1200,
  });
  const NavHeader = isSmall ? <MobileNav /> : <Nav />;

  useEffect(() => {
    const checkAndSetVisit = async () => {
      const viewedTime = localStorage.getItem("visited-at");
      const now = new Date();

      if (viewedTime) {
        const viewedDate = new Date(viewedTime);
        const hrsDiff = differenceInHours(now, viewedDate);

        if (hrsDiff >= 24) {
          await recordVisit();
          localStorage.setItem("visited-at", now.toString());
        }
      } else {
        await recordVisit();
        localStorage.setItem("visited-at", now.toString());
      }
    };

    const recordVisit = async () => {
      const country = getCountry();
      await addPageView(country);
    };

    checkAndSetVisit();
  }, []);

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
        {/* <Headroom style={{ zIndex: 99 }}>{NavHeader}</Headroom> */}
        {NavHeader}
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
