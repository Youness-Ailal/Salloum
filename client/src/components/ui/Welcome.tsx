import { Link } from "react-router-dom";
import scan from "@/assets/scan.png";
import { ImWhatsapp } from "react-icons/im";
import { useTranslation } from "react-i18next";
function Welcome() {
  const { t } = useTranslation("translate");
  return (
    <div className="grid lg:grid-cols-2 gap-x-10 gap-y-4">
      <div className="flex flex-col gap-4">
        <h4 className="uppercase text-2xl lg:text-4xl font-medium text-sky-950">
          {t("welcome_at")}{" "}
          <span className="text-sky-700">SALLOUM COMPANY</span>
        </h4>
        <p className="text-lg leading-8 text-gray-800">{t("welcome_text")}</p>
        <Link
          to={"/about"}
          className="py-3 mt-auto self-start uppercase text-xl lg:text-2xl px-8 bg-sky-800 hover:bg-sky-900 text-white rounded-sm">
          {t("more_about_us")}
        </Link>
      </div>
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
    </div>
  );
}

export default Welcome;
