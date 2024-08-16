import logo from "@/assets/logo.png";
import { BsFacebook, BsLinkedin } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { ImLocation, ImPhone } from "react-icons/im";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-sky-950 h-full w-full mt-auto p-4">
      <div className="container p-2 xl:p-6 flex gap-2 flex-wrap xl:gap-10 justify-between border-b border-gray-100">
        <Link to="/">
          <img src={logo} alt="salloum logo" />
        </Link>
        <div className="text-white text-lg flex flex-col gap-1 xl:gap-2">
          <Link className="hover:underline" to={"/equipments"}>
            Buy Equipments
          </Link>
          <Link className="hover:underline" to={"/sell-equipments"}>
            Sell Equipments
          </Link>
          <Link className="hover:underline" to={"/services"}>
            Services
          </Link>
        </div>
        <div className="text-white text-lg flex flex-col gap-1 xl:gap-2">
          <Link className="hover:underline" to={"/equipments"}>
            Contact us
          </Link>
          <Link className="hover:underline" to={"/equipments"}>
            About us
          </Link>
          <Link className="hover:underline" to={"/sell-equipments"}>
            Privacy Policy
          </Link>
          <Link className="hover:underline" to={"/services"}>
            Terms & Conditions
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
          <p className="max-w-72   flex gap-1 items-start">
            <span>
              <ImLocation />
            </span>{" "}
            Schlossbergstrasse 115, 66798 Wallerfangen, Deutschland
          </p>
        </div>
        <div className="text-white text-lg flex gap-2 xl:gap-3">
          <a
            className="text-3xl"
            href="https://www.facebook.com/salloumcompany"
            target="_blank"
            rel="noopener noreferrer">
            <BsFacebook />
          </a>
          <a
            className="text-3xl"
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer">
            <BsLinkedin />
          </a>
        </div>
      </div>
      <div className="container p-2 xl:p-4 flex gap-2 flex-wrap justify-between">
        <p className="text-sm text-white">
          Salloum Company {new Date().getFullYear()} - All rights reserved
        </p>
        <a
          target="_blank"
          href="https://viralwave.agency/"
          className="text-sm text-white">
          Created by ViralWave
        </a>
      </div>
    </footer>
  );
}

export default Footer;
