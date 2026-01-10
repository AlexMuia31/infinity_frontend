import { useAllFloors } from "@/app/hooks/CreateFloor/CreateFloor";
import React from "react";

export function colorToHex(color: bigint): string {
  return `#${color.toString(16).padStart(6, "0")}`;
}

const InfinityTower = () => {
  const { floors, isLoading, totalFloors } = useAllFloors();

  if (isLoading) return <div>Loading floors...</div>;

  return (
    <div>
      <h2>Total Floors: {totalFloors?.toString()}</h2>
      {floors.map((floor) => (
        <div
          key={floor.id}
          style={{
            backgroundColor: `#${floor.color.toString(16).padStart(6, "0")}`,
            padding: "20px",
            margin: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>
            Floor #{floor.id} - {floor.ownerName}
          </h3>
          <p>{floor.message}</p>
          <p>Color: {colorToHex(floor.color)}</p>
          {floor.link && (
            <a href={floor.link} target="_blank" rel="noopener noreferrer">
              Visit Link
            </a>
          )}
          <p>Window Tint: {floor.windowsTint.toString()}%</p>
        </div>
      ))}
    </div>
  );
};

export default InfinityTower;
