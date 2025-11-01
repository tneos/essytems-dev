"use client";
import {useQuery} from "@tanstack/react-query";
import {getStatsAction} from "@/utils/actions";
import StatsCard from "./StatsCard";
import {constructFromSymbol} from "date-fns/constants";

function StatsContainer() {
  const {data} = useQuery({
    queryKey: ["stats"],
    queryFn: () => getStatsAction(),
  });

  console.log(data);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatsCard title="Front of House" value={data?.frontOfHouse || 0} />
      <StatsCard title="Kitchen Staff" value={data?.backOfHouse || 0} />
      <StatsCard title="Management Team" value={data?.management || 0} />
    </div>
  );
}
export default StatsContainer;
