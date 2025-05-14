"use client";
import type React from "react";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { useSupabase } from "@/services/supabase/supabase.hook";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, authorised } = useSupabase({
    required: true,
    redirect: "/auth/login",
    role: ["ADMIN"],
  });

  if (isLoading || !authorised) return <p>Loading</p>;
  return (
    <DashboardSidebar>
      <div className="flex min-h-screen flex-col ">
        <div className="flex flex-col  h-full">
          <main className="p-3 flex h-full box-border  overflow-auto mb-20 mt-16">
            {children}
          </main>
        </div>
      </div>
    </DashboardSidebar>
  );
}