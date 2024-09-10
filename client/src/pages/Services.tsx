import Footer from "@/components/Footer/Footer";
import PageHeader from "@/components/ui/PageHeader";
import ServicesItems from "@/components/ui/ServicesItems";
import { useTranslation } from "react-i18next";
import SellMachineBanner from "@/components/ui/SellMachineBanner";

function Services() {
  const { t } = useTranslation("translate");
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title={t("our_services")} />
      <div className="container mx-auto py-4 lg:py-10">
        <p className="leading-8 text-sky-950 text-lg max-w-[120ch] p-2 lg:p-4">
          {t("services_beyond")}
        </p>
        <ServicesItems />
      </div>
      <div className="container mx-auto p-4 my-8 lg:my-16 mb-10 lg:mb-24">
        <SellMachineBanner />
      </div>
      <Footer />
    </div>
  );
}

export default Services;
