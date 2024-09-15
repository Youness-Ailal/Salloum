import scan from "@/assets/scan.png";
import { useTranslation } from "react-i18next";
import { ImWhatsapp } from "react-icons/im";

function WhatsAppBanner() {
  const { t } = useTranslation("translate");
  return (
    <div className="p-8 bg-sky-100 flex flex-col rounded-md text-sky-950">
      <p className="text-xl lg:text-2xl text-center font-semibold underline">
        {t("sell_your_machines")}
      </p>
      <div className="grid lg:grid-cols-2 gap-4  mt-4 lg:mt-10">
        <img src={scan} className="h-full  object-contain" alt="" />
        <a
          href="https://wa.me/+33641994383"
          target="_blank"
          className="bg-green-500 p-2 lg:p-4 rounded-sm flex gap-4 flex-col items-center justify-center">
          <ImWhatsapp className="text-white text-2xl lg:text-5xl" />
          <p className="mt-2 text-base text-center leading-7 text-sky-50">
            {t("whatsapp_instructions")}
          </p>
        </a>
      </div>
    </div>
  );
}

export default WhatsAppBanner;
