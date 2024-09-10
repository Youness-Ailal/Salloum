import Footer from "@/components/Footer/Footer";
import ContactDetails from "@/components/ui/ContactDetails";
import ContactForm from "@/components/ui/ContactForm";
import Faq from "@/components/ui/Faq";
import PageHeader from "@/components/ui/PageHeader";
import VisitUs from "@/components/ui/VisitUs";
import { useTranslation } from "react-i18next";

function Contact() {
  const { t } = useTranslation("translate");
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title={t("contact_us")} />
      <div className="container mx-auto p-4 lg:p-8 grid gap-y-4 lg:grid-cols-[3fr_1fr] ">
        <div className="lg:pr-8 lg:pb-0 pb-4 border-r border-gray-300">
          <ContactForm />
        </div>
        <div className="lg:pl-8 pt-4 lg:pt-0">
          <ContactDetails />
        </div>
      </div>
      <div className="container mx-auto my-10 mt-20">
        <VisitUs />
      </div>
      <div className="container mx-auto my-8 lg:my-20">
        <Faq />
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
