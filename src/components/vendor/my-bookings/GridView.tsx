"use client";

import React from "react";
import { Reservation } from "./types";
import GridCard from "./GridCard";

interface GridViewProps {
  reservations: Reservation[];
}

const GridView: React.FC<GridViewProps> = ({ reservations }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {reservations.map((reservation, index) => {
        return <GridCard key={index} reservation={reservation} />;
      })}
    </div>
  );
};

export default GridView;
