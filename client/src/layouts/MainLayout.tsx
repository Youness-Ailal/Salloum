import Nav from "@/components/Nav/Nav";
import { cn } from "@/lib/utils";

function MainLayout({ children, heightMobile = "90vh", height = "80vh" }) {
  return (
    <div className="flex flex-col">
      <div
        className={cn(`hero-bg flex flex-col`)}
        style={{
          minHeight: heightMobile,
          ["@media (min-width: 1024px)"]: {
            minHeight: height,
          },
        }}>
        <Nav />
        {children}
      </div>
    </div>
  );
}

export default MainLayout;
