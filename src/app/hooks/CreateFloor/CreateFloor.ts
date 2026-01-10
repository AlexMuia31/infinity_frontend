import {
  useReadContract,
  useReadContracts,
  useWriteContract,
  useWatchContractEvent,
} from "wagmi";
import { Abi } from "viem";

import { contractAddress, ABI } from "../index";

// Type definitions
export interface Floor {
  ownerName: string;
  message: string;
  link: string;
  color: bigint;
  windowsTint: bigint;
}

export interface CreateFloorParams {
  ownerName: string;
  message: string;
  link: string;
  color: bigint;
  windowsTint: bigint;
}

// Hook to get the total number of floors
export function useNbFloors() {
  return useReadContract({
    address: contractAddress,
    abi: ABI as unknown as Abi,
    functionName: "nbFloors",
  });
}

// Hook to get a specific floor by index
export function useFloor(floorIndex: bigint) {
  return useReadContract({
    address: contractAddress,
    abi: ABI as unknown as Abi,
    functionName: "floors",
    args: [floorIndex],
  });
}

// Hook to get all floors
export function useAllFloors() {
  const { data: nbFloors } = useNbFloors();
  const floorCount = nbFloors ? Number(nbFloors) : 0;

  // Create contracts array for batch reading
  const contracts = Array.from({ length: floorCount }, (_, i) => ({
    address: contractAddress,
    abi: ABI as unknown as Abi,
    functionName: "floors" as const,
    args: [BigInt(i)],
  }));

  const { data, isLoading, isError } = useReadContracts({
    contracts,
  });

  // Transform the data into a more usable format
  const floors =
    data?.map((result, index) => {
      if (result.status === "success" && result.result) {
        const [ownerName, message, link, color, windowsTint] =
          result.result as [string, string, string, bigint, bigint];
        return {
          id: index,
          ownerName,
          message,
          link,
          color,
          windowsTint,
        };
      }
      return {
        id: index,
        ownerName: "",
        message: "",
        link: "",
        color: 0n,
        windowsTint: 0n,
      };
    }) || [];

  return { floors, isLoading, isError, totalFloors: nbFloors };
}
// Hook to create a new floor
export function useCreateFloor() {
  const { writeContract, ...rest } = useWriteContract();

  const createFloor = (params: CreateFloorParams) => {
    writeContract({
      address: contractAddress,
      abi: ABI as unknown as Abi,
      functionName: "createFloor",
      args: [
        params.ownerName,
        params.message,
        params.link,
        params.color,
        params.windowsTint,
      ],
    });
  };

  return {
    createFloor,
    ...rest,
  };
}

// Hook to watch for FloorCreated events
export function useWatchFloorCreated(
  onLogs: (logs: unknown[]) => void,
  enabled: boolean = true
) {
  useWatchContractEvent({
    address: contractAddress,
    abi: ABI as unknown as Abi,
    eventName: "FloorCreated",
    onLogs,
    enabled,
  });
}
