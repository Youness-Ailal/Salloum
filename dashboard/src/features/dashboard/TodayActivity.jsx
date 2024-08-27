import styled from "styled-components";

import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { useSellEquipmentsRequests } from "../equipments/useSellEquipmentsRequests";
import { useBuyEquipmentsRequests } from "../equipments/useBuyEquipmentsRequests";
import { useMessages } from "../messages/useMessages";
import { differenceInHours } from "date-fns";
import Spinner from "../../ui/Spinner";
import { VscArrowCircleLeft } from "react-icons/vsc";
import { BiMessage, BiPurchaseTag } from "react-icons/bi";
import lodash from "lodash";

const StyledToday = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  padding-top: 2.4rem;
`;

const TodayList = styled.div`
  overflow-y: auto;
  overflow-x: hidden;

  /* Removing scrollbars for webkit, firefox, and ms, respectively */
  &::-webkit-scrollbar {
    width: 0 !important;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;
const TodayItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.4rem;
  color: var(--color-grey-800);
  padding: 6px 10px;
  border-radius: 0.3rem;
  border: 1px solid var(--color-grey-200);
  svg {
    font-size: 2.5rem;
    color: var(--color-brand-800);
  }
  strong {
    font-weight: 600;
  }
`;

const icons = {
  sell: <VscArrowCircleLeft style={{ rotate: "-45deg" }} />,
  buy: <BiPurchaseTag />,
  message: <BiMessage />,
};
const filterToday = item =>
  differenceInHours(new Date(), new Date(item.date)) <= 48;
const mapActivity = (title, type) => item => ({
  title,
  type,
  sender: item.fullName,
});
function TodayActivity() {
  const { isLoading: sellsLoading, data: sells } = useSellEquipmentsRequests();
  const { isLoading: buysLoading, data: buys } = useBuyEquipmentsRequests();
  const { isLoading: messagesLoading, mesasges } = useMessages();
  const todayActivities = [
    ...(sells
      ?.filter(filterToday)
      .map(mapActivity("sell request received", "sell")) || []),
    ...(buys
      ?.filter(filterToday)
      .map(mapActivity("purchase request received", "buy")) || []),
    ...(mesasges
      ?.filter(filterToday)
      .map(mapActivity("message received", "message")) || []),
  ];
  const loading = sellsLoading || buysLoading || messagesLoading;

  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2">Today</Heading>
      </Row>
      {loading ? (
        <Spinner />
      ) : !todayActivities.length ? (
        <NoActivity>No activities today</NoActivity>
      ) : (
        <TodayList>
          {todayActivities.map(item => (
            <TodayItem>
              {icons[item.type]}
              New<strong> {item.title} </strong>From
              <strong> {item.sender}</strong>
            </TodayItem>
          ))}
        </TodayList>
      )}
    </StyledToday>
  );
}

export default TodayActivity;
