import { useAllFloors } from "@/app/hooks/CreateFloor/CreateFloor";
import { Canvas } from "@react-three/fiber";
import React from "react";
import { Floor } from "../../models/Floor";
import { Card, CardContent, Typography, Box } from "@mui/material";

export function colorToHex(color: bigint): string {
  return `#${color.toString(16).padStart(6, "0")}`;
}

const InfinityTower = () => {
  const { floors, isLoading, totalFloors } = useAllFloors();
  const [scrollPosition, setScrollposition] = React.useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollposition(position);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading) return <div>Loading floors...</div>;

  return (
    <>
      <div id="InfinityTowerCanvasWrapper">
        <Canvas camera={{ position: [-12, 1, 14], fov: 35, near: 1, far: 100 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[20, 30, 10]} />
          <pointLight position={[20, 30, 10]} color="blue" />
          <spotLight position={[-2, -1, 32]} angle={0.2} intensity={1} />
          {floors.map((floor, index) => (
            <Floor
              key={floor.id}
              position={[0, index * 2, 0]}
              rotation={[0, Math.PI, index * 0.08]}
              color={colorToHex(floor.color)}
              windowsTint={floor.windowsTint.toString()}
            />
          ))}
        </Canvas>
      </div>
      {floors.map((floor, index) => (
        <Box
          key={index}
          sx={{
            pointerEvents: "none",
            maxWidth: 1200,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Card sx={{ p: 1, width: "300px", height: "100px", zIndex: 999 }}>
            <CardContent>
              <Typography variant="h6">Floor {index + 1}</Typography>
              <Typography variant="body2">
                <strong>Owner:</strong> {floor.ownerName}
              </Typography>
              <Typography variant="body2">
                <strong>Message:</strong> {floor.message}
              </Typography>
              <Typography variant="body2">
                <strong>Link</strong> {floor.link}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      ))}
    </>
  );
};

export default InfinityTower;
