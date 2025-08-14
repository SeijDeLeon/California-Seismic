import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DiaphragmInput from "./DiaphragmInput";

// locally silence ONLY the act() deprecation warning for this file
const realError = console.error;
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation((...args) => {
    const msg = args[0];
    if (typeof msg === "string" && msg.includes("ReactDOMTestUtils.act is deprecated")) {
      return; // swallow this specific deprecation
    }
    realError(...args); // keep all other errors
  });
});

afterAll(() => {
  console.error.mockRestore();
});


test("renders Diaphragm Input page", () => {
  render(<DiaphragmInput />);
  // Just check the key headings/text render
  expect(screen.getByRole("heading", { name: /diaphragm input/i })).toBeInTheDocument();
  expect(screen.getByText(/inputs/i)).toBeInTheDocument();
  expect(screen.getByText(/shear wall/i)).toBeInTheDocument();
});
