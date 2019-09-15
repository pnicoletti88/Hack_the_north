import { number } from "prop-types";

export const getBlocks = async () => {
  const data = await setTimeout(() => {
    return [
      {
        blockIndex: 1,
        data: {
          yeet1: "yes",
          yeet2: "yes"
        },
        timeStamp: "12323135"
      },
      {
        blockIndex: 2,
        data: {
          yeet1: "no",
          yeet2: "yes"
        },
        timeStamp: "09439830"
      },
      {
        blockIndex: 1,
        data: {
          yeet1: "no",
          yeet2: " no"
        },
        timeStamp: "5420301"
      }
    ];
  }, 1000);
  return data;
};
