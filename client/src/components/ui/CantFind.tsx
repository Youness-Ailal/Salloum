import { Link } from "react-router-dom";
import hero from "@/assets/hero-image.jpg";

function CantFind() {
  return (
    <div
      className="w-full bg-left bg-cover lg:grid grid-cols-[1.2fr_1fr] rounded-md"
      style={{
        backgroundImage: `url("${hero}")`,
      }}>
      <div className="p-5 lg:p-8 lg:py-14 bg-sky-950/90">
        <p className="uppercase text-xl lg:text-3xl text-white font-semibold">
          Can’t Find the Equipment You Need?
        </p>
        <p className="mt-4 lg:mt-8 text-white text-lg lg:text-xl max-w-[44ch]  font-semibold">
          If the process equipment you’re looking for isn’t listed on our
          website, contact us at{" "}
          <a
            href="tel:+33 6 41 99 43 83"
            className=" underline hover:text-sky-400 text-sky-400">
            +33 6 41 99 43 83
          </a>{" "}
          or fill out our{" "}
          <Link className="hover:text-sky-400 text-sky-300" to="/contact">
            contact form
          </Link>
          . We’ll do our best to source it for you.
        </p>
      </div>
    </div>
  );
}

export default CantFind;
