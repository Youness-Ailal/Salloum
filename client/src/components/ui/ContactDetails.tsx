import { social_links } from "@/utils/constants";
import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs";
import { ImLocation, ImPhone } from "react-icons/im";
import { IoMdMail } from "react-icons/io";

function ContactDetails() {
  return (
    <div className="text-sky-950 text-lg flex flex-col gap-3 xl:gap-6 lg:mt-4">
      <a
        href="mailto:contact@salloumcompany.com"
        className="hover:underline flex gap-2 lg:gap-3 items-center">
        <span className="text-xl lg:text-2xl text-sky-900">
          <IoMdMail />
        </span>{" "}
        contact@salloumcompany.com
      </a>
      <a
        href="tel:+33641994383"
        className="hover:underline flex gap-2 lg:gap-3 items-center">
        <span className="text-xl lg:text-2xl text-sky-900">
          <ImPhone />
        </span>{" "}
        +33 6 41 99 43 83
      </a>
      <a
        href="tel:+4917636862705"
        className="hover:underline flex gap-2 lg:gap-3 items-center">
        <span className="text-xl lg:text-2xl text-sky-900">
          <ImPhone />
        </span>{" "}
        +49 17 63 68 62 705
      </a>
      <p className="max-w-72   flex gap-2 lg:gap-3 items-start">
        <span className="text-2xl lg:text-2xl text-sky-900">
          <ImLocation />
        </span>{" "}
        Schlossbergstrasse 115, 66798 Wallerfangen, Deutschland
      </p>
      <div className="mt-4 flex gap-3 xl:gap-6">
        <a
          className="text-3xl p-2 bg-sky-900 text-white rounded-md"
          href={social_links.facebook}
          target="_blank"
          rel="noopener noreferrer">
          <BsFacebook />
        </a>
        <a
          className="text-3xl p-2 bg-sky-900 text-white rounded-md"
          href={social_links.linkedin}
          target="_blank"
          rel="noopener noreferrer">
          <BsLinkedin />
        </a>
        <a
          className="text-3xl p-2 bg-sky-900 text-white rounded-md"
          href={social_links.youtube}
          target="_blank"
          rel="noopener noreferrer">
          <BsYoutube />
        </a>
        <a
          className="text-3xl p-2 bg-sky-900 text-white rounded-md"
          href={social_links.instagram}
          target="_blank"
          rel="noopener noreferrer">
          <BsInstagram />
        </a>
      </div>
    </div>
  );
}

export default ContactDetails;
