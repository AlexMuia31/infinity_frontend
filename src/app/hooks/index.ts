import { type Address } from "viem";

export const contractAddress =
  "0x277B919a437CD65B98672957D1b6DC1411A88598" as Address;

export const ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "floorIndex",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "ownerName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "link",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "color",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "windowsTint",
        type: "uint256",
      },
    ],
    name: "FloorCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "ownerName",
        type: "string",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        internalType: "string",
        name: "link",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "color",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "windowsTint",
        type: "uint256",
      },
    ],
    name: "createFloor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "floors",
    outputs: [
      {
        internalType: "string",
        name: "ownerName",
        type: "string",
      },
      {
        internalType: "string",
        name: "message",
        type: "string",
      },
      {
        internalType: "string",
        name: "link",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "color",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "windowsTint",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nbFloors",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
