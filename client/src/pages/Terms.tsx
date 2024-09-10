import Footer from "@/components/Footer/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { useTranslation } from "react-i18next";

function Terms() {
  const { t } = useTranslation("terms");
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title={"TERMS & CONDITIONS"} />
      <div className="container mx-auto text-start my-4 lg:my-8 text-lg leading-8 max-w-[80ch]">
        <h4 className="text-2xl lg:text-4xl font-medium text-sky-950 mb-8 leading-8 lg:leading-10">
          {t("dispute_resolution")}
        </h4>
        <p>
          {t("dispute_resolution_text")}{" "}
          <a href={t("odr_link")} target="_blank" rel="noopener noreferrer">
            {t("odr_link")}
          </a>
        </p>
        <div className="my-4">
          <p className="mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            {t("responsibility_for_content")}
          </p>
          <p>{t("content_text")}</p>
        </div>
        <div className="my-4">
          <p className="mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            {t("responsibility_for_links")}
          </p>
          <p>{t("links_text")}</p>
        </div>
        <div className="my-4">
          <p className="mt-4 lg:mt-8 py-2 border-b border-sky-900/30 text-lg lg:text-xl text-sky-950">
            {t("copyright")}
          </p>
          <p>{t("copyright_text")}</p>{" "}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Terms;
