import { Link } from "react-router-dom";
import hero from "@/assets/hero-image.jpg";
import { useTranslation } from "react-i18next";
import { contact } from "@/utils/constants";
import WhatsAppBanner from "./WhatsAppBanner";
import useLayout from "@/data/useLayout";

function SellMachineBanner() {
  const { t } = useTranslation(["translate"]);
  const { layout } = useLayout();
  //@ts-ignore
  const bannerImage = layout?.filter(item => item.type === "banner_home")[0]
    ?.image;
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div
        className="w-full overflow-hidden bg-left bg-cover rounded"
        style={{
          backgroundSize: "100%",
          backgroundPosition: "50% 50%",
          backgroundImage: `linear-gradient(to right, rgba(8, 51, 68, 0.95), rgba(8, 51, 68, 0.7)), url("${bannerImage}")`,
        }}>
        <div className="p-5 lg:p-10">
          <p className="uppercase text-xl lg:text-3xl text-white font-semibold">
            {t("translate:to_sell")} ?
          </p>
          <p className="mt-4 lg:mt-8 text-white text-lg lg:text-xl max-w-[44ch]  font-semibold">
            {t("translate:to_sell_text_1")}{" "}
            <a
              href="tel:+33 6 41 99 43 83"
              className=" underline hover:text-sky-400 text-sky-400">
              +33 6 41 99 43 83
            </a>
            {" or "}
            <a
              href={"tel:" + contact.phoneGerman}
              className=" underline hover:text-sky-400 text-sky-400">
              {contact.phoneGerman}
            </a>{" "}
            {t("translate:cant_find_or")}{" "}
            <Link
              className="hover:text-sky-400 text-sky-300"
              to="/sell-equipments">
              {t("translate:cant_find_form")}{" "}
            </Link>
            {t("translate:cant_find_do")}
          </p>
        </div>
      </div>
      <WhatsAppBanner />
    </div>
  );
}

export default SellMachineBanner;
