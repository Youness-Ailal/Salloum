import Footer from "@/components/Footer/Footer";
import Button from "@/components/ui/Button";
import Categories from "@/components/ui/Categories";
import FeaturedEquipments from "@/components/Equipments/FeaturedEquipments";
import UnderLine from "@/components/ui/UnderLine";
import MainLayout from "@/layouts/MainLayout";
import { BiPurchaseTag } from "react-icons/bi";
import { BsArrowDownCircle } from "react-icons/bs";
import Faq from "@/components/ui/Faq";
import Brands from "@/components/ui/Brands";
import useLayout from "@/data/useLayout";
import { useTranslation } from "react-i18next";
import VisitUs from "@/components/ui/VisitUs";
import Welcome from "@/components/ui/Welcome";
import SellMachineBanner from "@/components/ui/SellMachineBanner";

function Home() {
  const { isLoading, layout } = useLayout();
  const { t } = useTranslation(["translate"]);

  //@ts-ignore
  const banner = layout?.filter(item => item?.type === "banner")[0];
  return (
    <>
      <MainLayout>
        <main className="text-white flex items-center justify-start flex-grow container mx-auto">
          <div className="flex-col gap-4 p-4 xl:p-32">
            <h1 className="text-xl lg:text-2xl font-bold text-cyan-400 tracking-widest uppercase">
              {t("translate:header.title")}
            </h1>
            <h2 className="text-3xl xl:text-5xl font-semibold mt-4 lg:mt-6 tracking-wide">
              {t("translate:header.subtitle")}
              <p className="mt-2 lg:mt-3 relative z-50">
                {t("translate:header.description")}
                <span className="absolute left-0 -bottom-5 -z-10 scale-75 hidden sm:block ">
                  <UnderLine />
                </span>
              </p>
            </h2>
            <div className="flex flex-wrap items-center gap-4 xl:gap-6 mt-16 xl:mt-24">
              <Button as="link" to="/equipments">
                {t("translate:buy_equipments")}
                <span>
                  <BiPurchaseTag />
                </span>
              </Button>
              <Button as="link" variant="outline" to="sell-equipments">
                {t("translate:sell_your_equipments")}
                <span className="-rotate-45">
                  <BsArrowDownCircle />
                </span>
              </Button>
            </div>
          </div>
        </main>
      </MainLayout>
      <div className="p-4 container mx-auto mt-10 flex flex-col gap-8 xl:gap-20">
        <Brands />
        <Welcome />
        <FeaturedEquipments />
        {banner && (
          <img
            className="w-full relative object-cover max-h-[200px] sm:max-h-[250px] md:max-h-[300px] lg:max-h-[350px] xl:max-h-[500px] mx-auto rounded-md"
            src={banner?.image}
            alt="salloum"
          />
        )}
        <Categories />
        {/* <div className="flex flex-col p-4  gap-5 mt-6 xl:mt-14 xl:grid grid-cols-2 xl:gap-9">
          <SellEquiBanner />
          <div>
            <h4 className="text-2xl xl:text-4xl uppercase font-bold tracking-wider text-sky-950 mt-4">
              About <span className="text-sky-800">Salloum Company</span>{" "}
              Industrial Equipment
            </h4>
            <p className="mt-5 xl:mt-9 xl:max-w-[45ch] leading-10 text-lg xl:text-xl text-sky-950">
              We enhance value, not just equipment.
              <br /> With 8,000 m² of warehouse space, we give unused machinery
              a new purpose, ensuring swift access to industrial equipment at
              great prices. Our offerings span sales, purchases, consignment,
              brokerage, and end-to-end logistics.
            </p>
          </div>
        </div> */}
        <div className="mt-4 xl:mt-8">
          <VisitUs />
        </div>
        <div className="mt-4 xl:mt-8">
          <Faq />
        </div>
        <div className="mt-4 xl:mt-7">
          <SellMachineBanner />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
