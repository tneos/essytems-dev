import {getStatsAction, getChartsDataAction} from "@/utils/actions";

async function StatsPage() {
  const charts = await getChartsDataAction();
  const stats = await getStatsAction();
  console.log(charts);
  return <h1>Stats Page</h1>;
}
export default StatsPage;
