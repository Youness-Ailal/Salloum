import styled from "styled-components";
import Heading from "../../ui/Heading";
import Spinner from "../../ui/Spinner";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { useAnalitics } from "./useAnalitics";
import { differenceInDays, parse } from "date-fns";
import { useSearchParams } from "react-router-dom";

const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const colorsLight = ["#ef4444", "#f97316", "#eab308", "#84cc16", "#22c55e"];

const colorsDark = ["#b91c1c", "#c2410c", "#a16207", "#4d7c0f", "#15803d"];

function VisitsPerCountry() {
  const { isDarkMode } = useDarkMode();
  const { isLoading, analytics } = useAnalitics();
  const colors = isDarkMode ? colorsDark : colorsLight;
  const [searchParams] = useSearchParams();
  const lastDays = searchParams.get("last") || "7";
  const analyticsDays = analytics?.filter(
    item =>
      differenceInDays(
        new Date(),
        parse(item.date, "dd LLLL yyyy", new Date())
      ) <= +lastDays
  );

  // Calculate country counts across all days
  const countryCounts =
    analyticsDays?.reduce((counts, { countries }) => {
      // Loop over each country in the 'countries' object
      for (const [country, count] of Object.entries(countries)) {
        counts[country] = (counts[country] || 0) + count; // Sum up counts per country
      }
      return counts;
    }, {}) || {};

  // Sort the countries by their total visit counts
  const sortedCountries = Object.entries(countryCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([country]) => country);

  // Get top 4 countries and calculate the rest
  const topCountries = sortedCountries.slice(0, 4);
  const restCountries = sortedCountries.slice(4);
  const restCountriesCount = restCountries.reduce(
    (sum, country) => sum + countryCounts[country],
    0
  );

  // Combine top countries and "Others" into the result array
  const restEntry = { country: "Others", count: restCountriesCount };
  const result = [
    ...topCountries.map(country => ({
      country,
      count: countryCounts[country],
    })),
    restEntry,
  ];

  // Filter out countries with 0 counts and assign colors
  const data = result.filter(entry => entry.count > 0);
  const coloredData = data.map((item, i) => {
    if (item.country === "Others") return { ...item, color: colors[4] };
    return { ...item, color: colors[i % colors.length] };
  });

  // const startData = isDarkMode ? startDataDark : startDataLight;
  if (isLoading)
    return (
      <ChartBox>
        <Heading as="h2">Top Visits by Country</Heading>
        <Spinner />
      </ChartBox>
    );
  return (
    <ChartBox>
      <Heading as="h2">Top Visits by Country</Heading>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={coloredData}
            nameKey="country"
            dataKey="count"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={3}>
            {coloredData.map(entry => (
              <Cell
                fill={entry.color}
                stroke={entry.color}
                key={entry.country}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default VisitsPerCountry;
