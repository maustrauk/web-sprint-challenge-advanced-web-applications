import React from "react";
import { render, screen , wait } from "@testing-library/react";
import App from '../App'
import BubblePage from "./BubblePage";

import { fetchColors as mockFetchColors } from '../api/fetchColors'

jest.mock('../api/fetchColors')

const res = {
  data: [
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
  },
  {
    color: "aqua",
    code: {
      hex: "#00ffff"
    },
    id: 3
  },
  {
    color: "aquamarine",
    code: {
      hex: "#7fffd4"
    },
    id: 4
  }
]};

test("Fetches data and renders the bubbles", async () => {
   // // Finish this test
 
  render(<App />)

  mockFetchColors.mockResolvedValueOnce(res)
  await render(<BubblePage/>)
  await wait();

  const color = await screen.findByText(/aliceblue/i)
  expect(color).toBeInTheDocument() 

});