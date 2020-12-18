import React from "react";
import { render, screen, wait } from "@testing-library/react";
import BubblePage from "./BubblePage";

import { getData as mockGetData } from './../api/getData';
jest.mock('./../api/getData');

const myFunc = (data) => {
  return data;
}


test("Fetches data and renders the bubbles", async () => {
  render(<BubblePage/>);
  mockGetData.mockResolvedValueOnce({
    data:[
      {
        color: "aliceblue",
        code: {
          hex: "#f0f8ff"
        },
        id: 1
      },
      {
        color: "limegreen",
        code: {
          hex: "#99ddbc"
        },
        id: 2
      }
    ]
  });

  await wait();
});
