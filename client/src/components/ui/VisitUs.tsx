import { useTranslation } from "react-i18next";
import { BiTrain } from "react-icons/bi";
import { ImLocation } from "react-icons/im";
import { IoMdTime } from "react-icons/io";
import { Link } from "react-router-dom";

function VisitUs() {
  const { t } = useTranslation("translate");
  return (
    <div className="grid lg:grid-cols-2 gap-4 border border-sky-200 text-sky-950 rounded-md bg-sky-50">
      <div className="p-4 lg:p-8">
        <div className="grid grid-cols-[auto_1fr] items-start gap-3">
          <ImLocation className="text-2xl" />
          <p className="text-lg ">{t("always_welcome")} </p>
        </div>
        <div className="mt-8">
          <p className="grid grid-cols-[auto_1fr] items-center gap-4 text-lg font-medium">
            <BiTrain className="text-2xl" /> {t("by_plane")}{" "}
          </p>
          <p className="pl-12 mt-2 text-lg">{t("directions")}</p>
        </div>
        <div className="mt-8 grid grid-cols-[auto_1fr] items-start gap-4">
          <IoMdTime className="text-2xl font-medium" />
          <p className="text-lg">
            {t("can_reach")} -{" "}
            <a
              className="text-sky-950 font-medium underline"
              href="mailto:contact@salloumcompany.com">
              {t("send_an_email")}{" "}
            </a>
          </p>
        </div>
      </div>
      <iframe
        className="w-full min-h-[300px] lg:min-h-[500px] "
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCoJheqNQWswwrqghG_wgXyeaRFY6qv3pg
      &q=Salloum+Company &zoom=15"></iframe>
    </div>
  );
}

export default VisitUs;
