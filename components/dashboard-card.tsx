"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountUp from "react-countup";

interface Props {
  icon: React.ReactNode;
  title: string | number;
  subtitle: string | number;
  description: string;
}
const DashboardCard = ({ icon, title, subtitle, description }: Props) => {
  return (
    <Card className="transition-transform duration-300 hover:scale-[1.02]">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {typeof subtitle === "string" ? (
            subtitle
          ) : (
            <CountUp end={subtitle} start={0} />
          )}
        </div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};
export default DashboardCard;
