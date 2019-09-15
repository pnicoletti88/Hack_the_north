import { number } from "prop-types";
import { axios } from 'axios';

export const getBlocks = async () => {
  const data = await new Promise((res) =>{
    setTimeout(() => {
    res([
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
      },      {
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
      },      {
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
      },      {
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
      },      {
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
      },      {
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
      },      {
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
      },      {
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
      },      {
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
      },      {
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
      },      {
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
      },      {
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
      },      {
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
      },      {
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
      },      {
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
    ]);
  }, 1000);
  });
  console.log(data)
  return data;
};

export const mockRecData = async () => {
  console.log("in")
  return await new Promise((res) => res({
    freshRev: 1000,
    freshExp: 500,
    blockRev: 1000,
    blockExp: 500
  }))
}

export const dbURL = "http://localhost:5000"