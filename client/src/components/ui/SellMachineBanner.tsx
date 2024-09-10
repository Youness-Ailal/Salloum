import { Link } from "react-router-dom";
import hero from "@/assets/hero-image.jpg";
import { useTranslation } from "react-i18next";

function SellMachineBanner() {
  const { t } = useTranslation(["translate"]);
  return (
    <div
      className="w-full overflow-hidden bg-left bg-cover lg:grid grid-cols-[1.2fr_1fr] rounded"
      style={{
        backgroundImage: `url("${hero}")`,
      }}>
      <div className="p-5 lg:p-8 lg:py-14 bg-sky-950/90">
        <p className="uppercase text-xl lg:text-3xl text-white font-semibold">
          {t("translate:to_sell")} ?
        </p>
        <p className="mt-4 lg:mt-8 text-white text-lg lg:text-xl max-w-[44ch]  font-semibold">
          {t("translate:to_sell_text_1")}{" "}
          <a
            href="tel:+33 6 41 99 43 83"
            className=" underline hover:text-sky-400 text-sky-400">
            +33 6 41 99 43 83
          </a>{" "}
          {t("translate:cant_find_or")}{" "}
          <Link className="hover:text-sky-400 text-sky-300" to="/contact">
            {t("translate:cant_find_form")}{" "}
          </Link>
          {t("translate:cant_find_do")}
        </p>
      </div>
    </div>
  );
}

export default SellMachineBanner;
