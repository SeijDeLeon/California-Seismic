// Test for rendering Diaphragm viewer SVG component
import { render, screen } from "@testing-library/react";
import DiaphragmViewer from "../../components/features/DiaphragmApp/DiaphragmViewer";

const mockInputs = {
  wallLines: [
    { wall: "A", openings: [[5, 10]], length: 30 },
    { wall: "B", openings: [[2, 8]], length: 30 },
  ],
  horizontalWallLengths: [50],
  uniformForces: [{ startForce: 200, endForce: 200 }],
};

const mockSolution = {
  wallLines: [
    {
      wall: "A",
      wallShear: 0,
      diaUnitShearLeft: 10,
      diaUnitShearRight: null,
    },
    {
      wall: "B",
      wallShear: 0,
      diaUnitShearLeft: null,
      diaUnitShearRight: 10,
    },
  ],
};

//add these because the plotly components called in the DiaphragmViewer crash the test
jest.mock("../../components/features/DiaphragmApp/ChordPlots", () => () => (
  <div data-testid="mock-chordplots" />
));
jest.mock("../../components/features/DiaphragmApp/CollectorPlots", () => () => (
  <div data-testid="mock-collectorplots" />
));

// Integrate some component logic to make the test dynamic
const ftToPx = (ft) => ft * 3;
const paddingX = 60;

//run the test!
describe("DiaphragmViewer SVG rendering", () => {
  test("renders SVG container", () => {
    render(<DiaphragmViewer inputs={mockInputs} solution={mockSolution} />);
    const svg = screen.getByTestId("svg-plot");
    expect(svg).toBeInTheDocument();
  });

  test("renders walls as 2 rect components", () => {
    render(<DiaphragmViewer inputs={mockInputs} solution={mockSolution} />);
    expect(screen.getByTestId("rect-A")).toBeInTheDocument();
    expect(screen.getByTestId("rect-B")).toBeInTheDocument();
  });

  test("wall coordinates and dimensions are correct", () => {
    render(<DiaphragmViewer inputs={mockInputs} solution={mockSolution} />);
    expect(screen.getByTestId("rect-A")).toHaveAttribute(
      "width",
      String(ftToPx(mockInputs.horizontalWallLengths[0]))
    );
    expect(screen.getByTestId("rect-B")).toHaveAttribute(
      "x",
      String(paddingX + 5) // the current logic in the component
    );
  });

  test("SVG markup matches snapshot", () => {
    render(<DiaphragmViewer inputs={mockInputs} solution={mockSolution} />);
    const svg = screen.getByTestId("svg-plot"); // take only the svg bit
    expect(svg).toMatchSnapshot(); // compare & store the snapshot of only the svg
  });
});
