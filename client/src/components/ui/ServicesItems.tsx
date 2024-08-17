import { services } from "@/utils/constants";
import selling from "@/assets/sales.jpg";
import purchasing from "@/assets/purchasing.jpg";
import dismantling from "@/assets/dismantling.jpg";
import transort from "@/assets/transport.jpg";
import { cn } from "@/lib/utils";

const serviceImages = {
  Dismantling: dismantling,
  Sales: selling,
  Transport: transort,
  Purchasing: purchasing,
};
function ServicesItems() {
  return (
    <div
      className={`p-4 lg:p-7 my-8 bg-gray-50 grid grid-cols-1 gap-y-8 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6`}>
      {services.map(item => (
        <div
          className={cn(
            `min-h-40 bg-100% hover:bg-110% transition-all p-4 flex flex-col items-end lg:p-8 overflow-hidden relative lg:min-h-[500px] bg-center`
          )}
          style={{
            //@ts-ignore
            backgroundImage: `url("${serviceImages[item.title]}")`,
          }}>
          <p className="z-10 p-2 border-b-2 border-gray-50  text-end relative text-white uppercase text-xl lg:text-2xl font-medium">
            {item.title}
          </p>
          <span className="absolute h-full w-full left-0 top-0 bg-gradient-to-b transition from-sky-800/80 to-sky-950/80 pointer-events-none select-none z-0"></span>
        </div>
      ))}
    </div>
  );
}

export default ServicesItems;
