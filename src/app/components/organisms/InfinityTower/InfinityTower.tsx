import { useAllFloors } from "@/app/hooks/CreateFloor/CreateFloor";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Floor } from "../../models/Floor";

export function colorToHex(color: bigint): string {
  return `#${color.toString(16).padStart(6, "0")}`;
}

const InfinityTower = () => {
  const { floors, isLoading, totalFloors } = useAllFloors();

  if (isLoading) return <div>Loading floors...</div>;

  return (
    <div id="InfinityTowerCanvasWrapper">
      <Canvas camera={{ position: [-12, 1, 14], fov: 35, near: 1, far: 100 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[20, 30, 10]} />
        <pointLight position={[20, 30, 10]} color="blue" />
        <spotLight position={[-2, -1, 32]} angle={0.2} intensity={1} />
        {floors.map((floor, index) => (
          <Floor
            key={floor.id}
            position={[0, index, 0]}
            rotation={[0, Math.PI, index * 0.08]}
            color={colorToHex(floor.color)}
            windowsTint={floor.windowsTint.toString()}
          />
        ))}
      </Canvas>
      {/* <h2>Total Floors: {totalFloors?.toString()}</h2>
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
      ))} */}
    </div>
  );
};

export default InfinityTower;
