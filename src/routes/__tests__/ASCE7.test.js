import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ASCE7 from "../ASCE7.jsx";

describe("ASCE7 component", () => {
  test("render default image (section 1.1)", () => {
    render(
      <MemoryRouter initialEntries={["/ASCE7"]}>
        <Routes>
          <Route path="/ASCE7" element={<ASCE7 />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByAltText("1.1.png")).toBeInTheDocument();
  });

  test("handles section selection", async () => {
    render(
      <MemoryRouter initialEntries={["/ASCE7"]}>
        <Routes>
          <Route path="/ASCE7" element={<ASCE7 />} />
          <Route path="/ASCE7/:sectionParam" element={<ASCE7 />} />
        </Routes>
      </MemoryRouter>
    );

    const selectorItem = screen.getByText(/1\.2\.1\s+Definitions/);
    fireEvent.click(selectorItem);
    await waitFor(() => {
      expect(screen.getByAltText("1.2.1_1.png")).toBeInTheDocument();
    });
  });

  test("renders section from URL parameter", () => {
    render(
      <MemoryRouter initialEntries={["/ASCE7/1.2.1"]}>
        <Routes>
          <Route path="/ASCE7/:sectionParam" element={<ASCE7 />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByAltText("1.2.1_2.png")).toBeInTheDocument();
  });

  test("displays error message for non-matching section", () => {
    render(
      <MemoryRouter initialEntries={["/ASCE7/nonexistent"]}>
        <Routes>
          <Route path="/ASCE7/:sectionParam" element={<ASCE7 />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Section was not found.")).toBeInTheDocument();
  });
});

