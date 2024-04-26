import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  backgroundColor?: string;
  iconBackgroundColor?: string;
}
const DashboardCard = ({
  icon,
  title,
  subtitle,
  backgroundColor,
  iconBackgroundColor,
}: Props) => {
  return (
    <Card
      className={cn(
        "shadow-md transition-transform duration-300 hover:scale-105 rounded-xl text-center",
        backgroundColor
      )}
    >
      <CardContent className="flex justify-between items-center py-8">
        <div className="space-y-1 flex flex-col justify-center items-center">
          <h3 className="text-2xl font-bold">{subtitle}</h3>
          <p className="text-gray-500 dark:text-gray-400">{title}</p>
        </div>
        <div className={cn("p-4 rounded-full", iconBackgroundColor)}>
          {icon}
        </div>
      </CardContent>
    </Card>
  );
};
export default DashboardCard;
