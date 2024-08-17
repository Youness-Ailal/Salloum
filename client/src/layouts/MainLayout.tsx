import Nav from "@/components/Nav/Nav";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
//@ts-ignore
import Headroom from "react-headroom";

//@ts-expect-error children
function MainLayout({ children, heightMobile = "80vh", height = "70vh" }) {
  const url = window.location.href;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [url]);
  return (
    <div className="flex flex-col">
      <div
        className={cn(`hero-bg flex flex-col`)}
        style={{
          minHeight: heightMobile,
          //@ts-expect-error minWidth
          ["@media (min-width: 1024px)"]: {
            minHeight: height,
          },
        }}>
        <Headroom style={{ zIndex: 99 }}>
          <Nav />
        </Headroom>
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
