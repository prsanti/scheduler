import React from "react";

import { render, cleanup, fireEvent, waitForElement, prettyDOM, getByText, getAllByText, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";

import Application from "components/Application";

import resetFixtures from "../../__mocks__/resetFixtures";
import axios from "../../__mocks__/axios";

afterEach(cleanup);
afterEach(axios.resetFixtures);

it("changes the schedule when a new day is selected", async () => {
  const { getByText } = render(<Application />);

  await waitForElement(() => getByText("Monday"));

  fireEvent.click(getByText("Tuesday"));

  expect(getByText("Leopold Silvers")).toBeInTheDocument();
});

it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  const { container, debug } = render(<Application />);

  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  fireEvent.click(getByAltText(appointment, "Add"));

  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  fireEvent.click(getByText(appointment, "Save"));

  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );

  expect(getByText(day, "no spots remaining")).toBeInTheDocument();
});

it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Delete" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));

  // 4. Check that the confirmation message is shown.
  expect(
    getByText(appointment, "Are you sure you want to delete this appointment?")
  ).toBeInTheDocument();

  // 5. Click the "Confirm" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Confirm"));

  // 6. Check that the element with the text "Deleting" is displayed.
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  // 7. Wait until the element with the "Add" button is displayed.
  await waitForElement(() => getByAltText(appointment, "Add"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
});

it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
  // 1. Render the Application.
  const { container, debug } = render(<Application />);

  // 2. Wait until the text "Archie Cohen" is displayed.
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // 3. Click the "Edit" button on the booked appointment.
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Edit"));

  // 4. Change the interviewee text to "Test Name"
  fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {
    target: { value: "Test Name" }
  });

  // 5. Click the "Save" button on the confirmation.
  fireEvent.click(queryByText(appointment, "Save"));

  // 6. Check that the element with the text "Saving" is displayed.
  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  // 7. Wait until "Test Name" is displayed
  await waitForElement(() => getByText(container, "Test Name"));

  // 8. Check that the DayListItem with the text "Monday" also has the text "1 spot remaining".
  const day = getAllByTestId(container, "day").find(day =>
    queryByText(day, "Monday")
  );
  expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
});

/* test number five */
it("shows the save error when failing to save an appointment", async () => {
  // Set up reject save
  axios.put.mockRejectedValueOnce();

  const { container, debug } = render(<Application />);

  // Wait for the text "Archie Cohen" to display
  await waitForElement(() => getByText(container, "Archie Cohen"));

  const appointments = getAllByTestId(container, "appointment");
  const appointment = appointments[0];

  // Click "Add" appointment button
  fireEvent.click(getByAltText(appointment, "Add"));

  // Set name to "Lydia Miller-Jones"
  fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
    target: { value: "Lydia Miller-Jones" }
  });

  // Select interviewer
  fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

  // Click "Save" button
  fireEvent.click(getByText(appointment, "Save"));

  // Check that the element with the text "Saving" is displayed.
  expect(getByText(appointment, "Saving")).toBeInTheDocument();

  // Check that "Could not save appointment." is in the document
  await waitForElement(() => getByText(container, "Could not save appointment."));
  expect(getByText(appointment, "Could not save appointment.")).toBeInTheDocument();
});

it("shows the delete error when failing to delete an existing appointment", async () => {
  axios.delete.mockRejectedValueOnce();

  const { container, debug } = render(<Application />);

  // Wait for the text "Archie Cohen" to display
  await waitForElement(() => getByText(container, "Archie Cohen"));

  // Click "Delete" appointment button
  const appointment = getAllByTestId(container, "appointment").find(
    appointment => queryByText(appointment, "Archie Cohen")
  );

  fireEvent.click(queryByAltText(appointment, "Delete"));

  // Check if confirm delete appointment appears
  expect(
    getByText(appointment, "Are you sure you want to delete this appointment?")
  ).toBeInTheDocument();

  // Click "Confirm" button
  fireEvent.click(queryByText(appointment, "Confirm"));

  // Check if "Deleting" is displayed
  expect(getByText(appointment, "Deleting")).toBeInTheDocument();

  // Check that "Could not delete appointment." is in the document
  await waitForElement(() => getByText(container, "Could not delete appointment."));
  expect(getByText(appointment, "Could not delete appointment.")).toBeInTheDocument();
});