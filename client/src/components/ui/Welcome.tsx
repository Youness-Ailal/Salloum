import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
function Welcome() {
  const { t } = useTranslation("translate");
  return (
    <div className="">
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
    </div>
  );
}

export default Welcome;
