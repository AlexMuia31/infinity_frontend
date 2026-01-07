import {
  useReadContract,
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
