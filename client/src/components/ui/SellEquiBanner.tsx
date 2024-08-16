import { BsArrowDownCircle } from "react-icons/bs";
import Button from "./Button";

function SellEquiBanner() {
  return (
    <div className="hero-bg-2 p-5 lg:p-10 rounded-md flex flex-col gap-4 xl:gap-7">
      <h3 className="text-2xl xl:text-5xl tracking-wider text-white font-bold gap-1 xl:gap-2 uppercase flex flex-col">
        <p>
          <span className="text-cyan-500">Sell</span> Your
        </p>{" "}
        equipment
      </h3>
      <p className="text-white text-lg xl:text-xl max-w-[45ch] ">
        We Purchase Equipment!
        <br /> Looking to sell your industrial machinery? Get in touch with us
        today
      </p>
      <Button
        className="self-start mt-4 xl:mt-7"
        as="link"
        variant="outline"
        to="/sell-equipments">
        Sell Equipment
        <span className="-rotate-45">
          <BsArrowDownCircle />
        </span>
      </Button>
    </div>
  );
}

export default SellEquiBanner;
