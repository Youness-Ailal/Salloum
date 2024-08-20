import Footer from "@/components/Footer/Footer";
import CantFind from "@/components/ui/CantFind";
import FeaturedEquipments from "@/components/Equipments/FeaturedEquipments";
import PageHeader from "@/components/ui/PageHeader";
import ServicesItems from "@/components/ui/ServicesItems";

function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title={"OUR SERVICES"} />
      <div className="container mx-auto py-4 lg:py-10">
        <p className="leading-8 text-sky-950 text-lg max-w-[120ch] p-2 lg:p-4">
          Beyond the trade of used industrial equipment, Salloum Company goes
          the extra mile by offering additional services to ensure a smooth and
          efficient resolution to the entire buying or selling process. Below,
          you can explore some of the services we provide, and we are also at
          your disposal for assistance with any other concerns. Don't hesitate
          to contact us via email with your inquiries, and we are committed to
          finding a solution that meets your satisfaction.
        </p>
        <ServicesItems />
      </div>
      {/* <div className="container mx-auto p-4 my-8 lg:my-20">
        <FeaturedEquipments />
      </div> */}
      <div className="container mx-auto p-4 my-8 lg:my-16 mb-10 lg:mb-24">
        <CantFind />
      </div>
      <Footer />
    </div>
  );
}

export default Services;
