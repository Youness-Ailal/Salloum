import { ImLocation, ImPhone } from "react-icons/im";
import { IoMdMail } from "react-icons/io";

function ContactDetails() {
  return (
    <div className="text-sky-950 text-lg flex flex-col gap-3 xl:gap-6 lg:mt-4">
      <a
        href="mailto:contact@salloumcompany.com"
        className="hover:underline flex gap-2 lg:gap-3 items-center">
        <span className="text-2xl lg:text-4xl text-sky-900">
          <IoMdMail />
        </span>{" "}
        contact@salloumcompany.com
      </a>
      <a
        href="tel:+33 6 41 99 43 83"
        className="hover:underline flex gap-2 lg:gap-3 items-center">
        <span className="text-2xl lg:text-4xl text-sky-900">
          <ImPhone />
        </span>{" "}
        +33 6 41 99 43 83
      </a>
      <p className="max-w-72   flex gap-2 lg:gap-3 items-start">
        <span className="text-2xl lg:text-4xl text-sky-900">
          <ImLocation />
        </span>{" "}
        Schlossbergstrasse 115, 66798 Wallerfangen, Deutschland
      </p>
    </div>
  );
}

export default ContactDetails;
