"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "./partials/overview";
import { VehicleStatus } from "./partials/vehicle-status";
import { RecentRental } from "./partials/recent-rental";
import { UpcomingExpiration } from "./partials/upcoming-expiration";
import { Button } from "@/components/ui/button";
import { FileText, DollarSign, Users, Car } from "lucide-react";
import { requestData } from "./finance/finance.types";
import { useAxios } from "@/services/axios/axios.hook";
import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "./finance/finance.api";
import { useEffect, useState } from "react";
import { string } from "zod";
import { graphData } from "./dashboard.types";
import StatsCard from "./partials/stats-card";
import { getDashboardData } from "./dashboard.api";
import DashboardSkeleton from "./partials/dashboard-skeleton";

export default function Dashboard() {
  const [statsData, setStatsData] = useState<graphData[] | null>(null);
  const [availableVehicleCount, setAvailableVehicleCount] = useState<
    number | null
  >(0);
  const { axios } = useAxios();
  const {
    data: dashboardData,
    isFetching,
    refetch,
    error,
  } = useQuery<any>({
    queryKey: ["dashboardData"],
    queryFn: async () => {
      const data = await getDashboardData(axios);
      console.log(data);
      let formatedData: graphData[] = [];
      data?.statsData.map(
        (item: { name: string; expenses: number; revenue: number }) => {
          formatedData = [
            ...formatedData,
            { name: item.name, total: item.revenue },
          ];
        }
      );
      if (formatedData.length > 0) {
        setStatsData(formatedData);
      }
      return data;
    },
  });

  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    if (dashboardData && dashboardData.vehicleStatusCount.length > 0) {
      setAvailableVehicleCount(
        dashboardData.vehicleStatusCount.filter(
          (item: any) => item.vehicle_status === "AVAILABLE"
        )[0].count
      );
    }
  }, [dashboardData]);

  if (isFetching) return <DashboardSkeleton />;
  if (error) return <>error Loading data </>;
  return (
    <div className="flex flex-col p-4 md:p-10 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatsCard
          revenue={statsData && statsData[statsData?.length - 1].total}
          availableVehicles={availableVehicleCount && availableVehicleCount}
          activeCustomers={dashboardData.activeCustomerCount}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Overview graphData={statsData} />

        <VehicleStatus graphData={dashboardData.vehicleStatusCount} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RecentRental rentalData={dashboardData.recentRental} />
        <UpcomingExpiration notification={dashboardData.notification} />
      </div>
    </div>
  );
}
