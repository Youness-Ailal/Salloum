import { BsArrowDownCircle } from "react-icons/bs";
import Button from "./Button";
import { Link } from "react-router-dom";

function SellEquiMiniBanner() {
  return (
    <Link
      to="sel-equipments"
      className="hero-bg p-5 lg:p-10 rounded-md flex flex-col gap-4 xl:gap-7">
      <h3 className="text-2xl xl:text-5xl tracking-wider text-white font-bold gap-1 xl:gap-2 uppercase flex flex-col">
        <p>
          <span className="text-cyan-500">Sell</span> Your
        </p>{" "}
        equipment
      </h3>

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
    </Link>
  );
}

export default SellEquiMiniBanner;
