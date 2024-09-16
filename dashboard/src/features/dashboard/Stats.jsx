import {
  HiEye,
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import Stat from "../../ui/Stat";
import { useEquipments } from "../equipments/useEquipments";
import { useSellEquipmentsRequests } from "../equipments/useSellEquipmentsRequests";
import { useBuyEquipmentsRequests } from "../equipments/useBuyEquipmentsRequests";
import { useSearchParams } from "react-router-dom";
import { differenceInDays } from "date-fns";
import { VscArrowCircleLeft, VscTools } from "react-icons/vsc";
import { BiPurchaseTag } from "react-icons/bi";
import { useAnalitics } from "./useAnalitics";

function Stats() {
  const { isLoading: equipLoading, equipments } = useEquipments();
  const { data: sells, isLoading: sellsLoading } = useSellEquipmentsRequests();
  const { data: buys, isLoading: buysLoading } = useBuyEquipmentsRequests();
  const { analytics, isLoading: analyticsLoading } = useAnalitics();
  const [searParams] = useSearchParams();
  const lastDays = searParams.get("last") || "7";

  const sellsDays = sells?.filter(item => {
    return differenceInDays(new Date(), new Date(item.date)) <= +lastDays;
  });
  const buysDays = buys?.filter(
    item => differenceInDays(new Date(), new Date(item.date)) <= +lastDays
  );
  const visitsDays = analytics?.filter(
    item => differenceInDays(new Date(), new Date(item?.date)) <= +lastDays
  );

  const equipmentsCount = equipments?.length;
  const sellCount = sellsDays?.length;
  const buysCount = buysDays?.length;
  const visitsCount = visitsDays?.reduce(
    (total, curr) => curr.count + total,
    0
  );
  return (
    <>
      <Stat
        isLoading={equipLoading}
        title="Equipments"
        color="blue"
        icon={<VscTools />}
        value={equipmentsCount}
      />

      <Stat
        isLoading={buysLoading}
        title="Buy Requests"
        color="indigo"
        icon={<BiPurchaseTag />}
        value={buysCount}
      />
      <Stat
        isLoading={sellsLoading}
        title="Sell Requests"
        color="yellow"
        icon={<VscArrowCircleLeft style={{ rotate: "-45deg" }} />}
        value={sellCount}
      />
      <Stat
        isLoading={analyticsLoading}
        title="Website visits"
        color="green"
        icon={<HiEye />}
        value={visitsCount}
      />
    </>
  );
}

export default Stats;
