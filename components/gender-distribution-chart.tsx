"use client";

import React from "react";
import { DonutChart } from "@tremor/react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const datahero = [
  {
    name: "Male",
    value: 9800,
  },
  {
    name: "Female",
    value: 1398,
  },
];

const dataFormatter = (number: number) =>
  `${Intl.NumberFormat("us").format(number).toString()}`;

export const GenderDistribution = () => (
  <Card>
    <CardHeader className="text-center">Gender Distribution</CardHeader>
    <CardContent>
      <DonutChart
        data={datahero}
        variant="pie"
        valueFormatter={dataFormatter}
        onValueChange={(v) => {}}
      />
    </CardContent>
  </Card>
);
