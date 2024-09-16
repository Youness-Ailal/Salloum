import styled from "styled-components";
import DashboardBox from "../../ui/DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import {
  differenceInDays,
  eachDayOfInterval,
  format,
  isSameDay,
  parse,
  subDays,
} from "date-fns";
import { useAnalitics } from "./useAnalitics";
import { useSearchParams } from "react-router-dom";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function VisitsLastDays() {
  const { isDarkMode } = useDarkMode();
  const { isLoading, analytics } = useAnalitics();
  const [searchParams] = useSearchParams();
  const lastDays = searchParams.get("last") || 7;

  // Filter analytics data for the last 'n' days
  const analyticsDays = analytics?.filter(item => {
    return differenceInDays(new Date(), new Date(item?.date)) <= +lastDays;
  });

  // Calculate visits per day by summing the 'count' for each day
  const visitsPerDay = analyticsDays?.reduce((acc, item) => {
    const date = format(new Date(item?.date), "yyyy-MM-dd");
    acc[date] = (acc[date] || 0) + item.count; // Add the count for the day
    return acc;
  }, {});

  // Generate all the dates within the interval and map them to visit counts
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), +lastDays - 1),
    end: new Date(),
  });

  // Map each date to the corresponding visit count, defaulting to 0 if no data
  const data = allDates.map(date => ({
    label: format(date, "MMM dd"),
    visits: visitsPerDay?.[format(date, "yyyy-MM-dd")] || 0,
  }));

  // Define colors based on dark mode or light mode
  const colors = isDarkMode
    ? {
        visits: { stroke: "rgb(7,89,133)", fill: "rgb(7,89,133)" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        visits: { stroke: "rgb(7,89,133)", fill: "#c7d2fe" },
        text: "#374151",
        background: "#fff",
      };

  if (isLoading)
    return (
      <StyledSalesChart>
        <Heading as="h2">
          Visits from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
          {format(allDates.at(-1), "MMM dd yyyy")}
        </Heading>
      </StyledSalesChart>
    );

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Visits from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}
      </Heading>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            allowDecimals={false}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            allowDecimals={false}
            unit=" "
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="visits"
            type="monotone"
            stroke={colors.visits.stroke}
            fill={colors.visits.fill}
            strokeWidth={2}
            name="Website Visits"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default VisitsLastDays;
