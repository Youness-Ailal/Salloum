import logo from "@/assets/logo.png";
import { subscribeToNewsletter } from "@/services/api";
import { social_links } from "@/utils/constants";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { BsFacebook, BsLinkedin, BsYoutube } from "react-icons/bs";

import { ImLocation, ImPhone } from "react-icons/im";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
function Footer() {
  const { t } = useTranslation("translate");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const { mutate: subscribeApi, status } = useMutation({
    mutationFn: subscribeToNewsletter,
    onSuccess: () => {
      setMessage("Welcome to our Newsletter!");
      setEmail("");
    },
  });
  const isLoading = status === "pending";

  function subscribeToNewsletterForm(e) {
    e.preventDefault();
    subscribeApi(email);
  }

  return (
    <footer className="bg-sky-950 h-full w-full mt-auto p-4">
      <div className="w-[min(2000px,100%)] mx-auto p-2 xl:p-6 flex gap-2 gap-y-6 flex-wrap xl:gap-10 justify-between border-b border-gray-100">
        <div>
          <Link to="/">
            <img src={logo} className="xl:h-14" alt="salloum logo" />
          </Link>
        </div>
        <div className="text-white text-lg flex flex-col gap-1 xl:gap-2">
          <Link className="hover:underline" to={"/equipments"}>
            {t("buy_equipments")}
          </Link>
          <Link className="hover:underline" to={"/sell-equipments"}>
            {t("sell_equipments")}
          </Link>
          <Link className="hover:underline" to={"/services"}>
            {t("services")}
          </Link>
        </div>
        <div className="text-white text-lg flex flex-col gap-1 xl:gap-2">
          <Link className="hover:underline" to={"/contact"}>
            {t("contact_us")}
          </Link>
          <Link className="hover:underline" to={"/about"}>
            {t("about_us")}
          </Link>
          <Link className="hover:underline" to={"/privacy"}>
            {t("privacy_policy_title")}
          </Link>
          <Link className="hover:underline" to={"/terms"}>
            {t("terms_and_conditions")}
          </Link>
        </div>
        <div className="text-white text-lg flex flex-col gap-1 xl:gap-2">
          <a
            href="mailto:contact@salloumcompany.com"
            className="hover:underline text-base flex gap-1 items-center">
            <span>
              <IoMdMail />
            </span>{" "}
            contact@salloumcompany.com
          </a>
          <a
            href="tel:+33 6 41 99 43 83"
            className="hover:underline flex gap-1 items-center">
            <span>
              <ImPhone />
            </span>{" "}
            +33 6 41 99 43 83
          </a>
          <a
            href="tel:+49 17 63 68 62 705"
            className="hover:underline flex gap-1 items-center">
            <span>
              <ImPhone />
            </span>{" "}
            +49 17 63 68 62 705
          </a>
          <p className="max-w-72   flex gap-1 items-start">
            <span>
              <ImLocation />
            </span>{" "}
            Schlossbergstrasse 115, 66798 Wallerfangen, Deutschland
          </p>
        </div>
        <div>
          <div className="text-white  self-start text-lg flex gap-2 xl:gap-3">
            <a
              className="text-3xl hover:text-sky-300"
              href={social_links.facebook}
              target="_blank"
              rel="noopener noreferrer">
              <BsFacebook />
            </a>
            <a
              className="text-3xl hover:text-sky-300"
              href={social_links.linkedin}
              target="_blank"
              rel="noopener noreferrer">
              <BsLinkedin />
            </a>
            <a
              className="text-3xl hover:text-sky-300"
              href={social_links.youtube}
              target="_blank"
              rel="noopener noreferrer">
              <BsYoutube />
            </a>
          </div>
          <div className="my-4">
            <p className="text-white text-lg pb-4">{t("subscribe")}</p>
            <form onSubmit={subscribeToNewsletterForm}>
              <input
                className="w-full mb-2 p-2 rounded-sm outline-none focus:outline-none"
                placeholder={"example@email.com"}
                required
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                id="email"
              />
              <button
                disabled={isLoading}
                className="uppercase disabled:opacity-70 py-2 tracking-widest px-4 bg-sky-700 text-center text-white w-full "
                data-formkit-toggle="172432890a">
                {t("subscribe_now")}
              </button>
              {message && (
                <p className="w-full py-2 text-sm uppercase text-green-50">
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-2 xl:p-4 flex gap-2 flex-wrap justify-between">
        <p className="text-sm text-white">{t("footer_copyright")}</p>
        <a
          target="_blank"
          href="https://viralwave.co.ma"
          className="text-sm text-white">
          {t("created_by")}
        </a>
      </div>
    </footer>
  );
}

export default Footer;
