export const imageStorageAbi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "imageTitle",
        type: "string",
      },
      {
        internalType: "string",
        name: "_imageUrl",
        type: "string",
      },
    ],
    name: "addImageUrl",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "imageTitle",
        type: "string",
      },
    ],
    name: "getImageUL",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// export default imageStorageAbi;
