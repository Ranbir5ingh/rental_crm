"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, DollarSign, Users } from "lucide-react";
import React from "react";
interface props {
  revenue?: number | null;
  activeCustomers?: number | null;
  availableVehicles?: number | null;
}
export default function StatsCard({
  revenue,
  activeCustomers,
  availableVehicles,
}: props) {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₹{revenue ?? "_"}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Active Customers
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{activeCustomers ?? "_"}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Available Vehicles
          </CardTitle>
          <Car className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{availableVehicles ?? "_"}</div>
        </CardContent>
      </Card>
    </>
  );
}
