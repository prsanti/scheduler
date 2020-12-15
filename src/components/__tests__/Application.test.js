import React from "react";

import { render, cleanup, fireEvent, waitForElement } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

// xit("renders without crashing", () => {
//   render(<Application />);
// });

// it("defaults to Monday and changes the schedule when a new day is selected", () => {

//   const { getByText, debug } = render(<Application />);
//   // console.log("test");
//   //debug();
//   return waitForElement(() => getByText("Monday"));
// });

// it("defaults to Monday and changes the schedule when a new day is selected", () => {
//   const { getByText } = render(<Application />);

//   return waitForElement(() => getByText("Monday")).then(() => {
//     //console.log("test");
//     fireEvent.click(getByText("Tuesday"));
//     expect(getByText("Leopold Silvers")).toBeInTheDocument();
//   });
// });

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

// describe("Application", () => {
//   it("defaults to Monday and changes the schedule when a new day is selected", () => {
//     const { getByText } = render(<Application />);
  
//     return waitForElement(() => getByText("Monday")).then(() => {
//       fireEvent.click(getByText("Tuesday"));
//       expect(getByText("Leopold Silvers")).toBeInTheDocument();
//     });
//   });
// })

// it("changes the schedule when a new day is selected", async () => {
//   const { getByText } = render(<Application />);

//   await waitForElement(() => getByText("Monday"));

//   fireEvent.click(getByText("Tuesday"));

//   expect(getByText("Leopold Silvers")).toBeInTheDocument();
// });

// axios jest test:  [
//   { status: 200, statusText: 'OK', data: [ [Object], [Object] ] },
//   {
//     status: 200,
//     statusText: 'OK',
//     data: { '1': [Object], '2': [Object], '3': [Object], '4': [Object] }
//   },
//   {
//     status: 200,
//     statusText: 'OK',
//     data: { '1': [Object], '2': [Object], '3': [Object], '4': [Object] }
//   }
// ]

// it("defaults to Monday and changes the schedule when a new day is selected", () => {
//   const { getByText } = render(<Application />);

//   return waitForElement(() => getByText("Monday"));
// });

// it("defaults to Monday and changes the schedule when a new day is selected", () => {
//   const { getByText } = render(<Application />);

//   return waitForElement(() => getByText("Monday"));
// });