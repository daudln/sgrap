"use client";

import React from "react";
import { DonutChart, Card } from "@tremor/react";
import CardWrapper from "./card-wrapper";

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
  <CardWrapper headerLabel="Gender Distribution" className="w-1/4">
    <DonutChart
      data={datahero}
      variant="pie"
      valueFormatter={dataFormatter}
      onValueChange={(v) => {}}
    />
  </CardWrapper>
);
