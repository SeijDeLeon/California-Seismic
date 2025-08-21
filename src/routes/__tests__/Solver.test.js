import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Solver from '../../components/features/Solver/Solver.jsx';
import { MathJaxContext } from 'better-react-mathjax';

// Mock the calculation functions
jest.mock('../../assets/data/calculations/calculateCs', () => () => 0.1234);
jest.mock('../../assets/data/calculations/calculateV', () => () => 1.234);
jest.mock('../../assets/data/calculations/calculateCvx', () => () => [0.123, 0.234]);
jest.mock('../../assets/data/calculations/calculateFvx', () => () => [0.123, 0.234]);
jest.mock('../../assets/data/calculations/calculateStiffness', () => () => 1.234);
jest.mock('../../assets/data/calculations/calculateFundamentalPeriod', () => () => 2.345);

describe('Solver component', () => {
  test('dropdown functionality', async () => {
    render(<Solver />);

    // Initial value to calculate: Cs
    const dropdown = screen.getByTestId("value-to-calculate");
    expect(dropdown.textContent).toEqual("Cs");

    // Select a new value: V
    fireEvent.click(dropdown);
    const optionV = screen.getByRole("option", { name: "Seismic Base Shear (V)" });
    fireEvent.click(optionV);
    expect(dropdown.textContent).toEqual("V");
    expect(optionV).not.toBeInTheDocument();

    // Change category to Fundamental Period. Default value is now: Stiffness
    fireEvent.click(screen.getByText("Fundamental Period"));
    expect(dropdown.textContent).toEqual("Stiffness");

    // Select a new value: Fundamental Period
    // optionV, which belongs to the Base Shear category, shouldn't appear in the new list
    fireEvent.click(dropdown);
    expect(optionV).not.toBeInTheDocument();
    const optionFundamentalPeriod = screen.getByRole("option", { name: "Fundamental Period" });
    fireEvent.click(optionFundamentalPeriod);
    expect(dropdown.textContent).toEqual("Fundamental Period");
    expect(optionFundamentalPeriod).not.toBeInTheDocument();
  })

  test('performs calculations and displays results', async () => {
    render(
      <MathJaxContext>
        <Solver />
      </MathJaxContext>
    );
    const dropdown = screen.getByTestId("value-to-calculate");
    expect(screen.getByTestId("output").value).toEqual("-");

    // Input values for Cs
    fireEvent.change(screen.getByRole("textbox", { name: "S DS" }), { target: { value: '0.5' } });
    fireEvent.change(screen.getByRole("textbox", { name: "S D1" }), { target: { value: '0.5' } });
    fireEvent.change(screen.getByLabelText('T'), { target: { value: '1.0' } });
    fireEvent.change(screen.getByRole("textbox", { name: "I e" }), { target: { value: '1.0' } });
    fireEvent.change(screen.getByLabelText('R'), { target: { value: '5.0' } });
    fireEvent.change(screen.getByRole("textbox", { name: "T 0" }), { target: { value: '0.2' } });
    fireEvent.change(screen.getByRole("textbox", { name: "T L" }), { target: { value: '8.0' } });
    expect(screen.getByTestId("output").value).toEqual("0.1234");

    // Input values for V
    fireEvent.click(dropdown);
    fireEvent.click(screen.getByRole("option", { name: "Seismic Base Shear (V)" }));
    fireEvent.change(screen.getByRole("textbox", { name: "C s" }), { target: { value: '0.1234' } });
    fireEvent.change(screen.getByLabelText('Weights (kip)'), { target: { value: '[1.0, 2.0, 3.0]' } });
    expect(screen.getByTestId("output").value).toEqual("1.2340");

    // Input values for Cvx
    fireEvent.click(dropdown);
    fireEvent.click(screen.getByRole("option", { name: "Vertical Distribution Factor ( C vx )" }));
    fireEvent.change(screen.getByLabelText('Weights (kip)'), { target: { value: '[1.0, 2.0, 3.0]' } });
    fireEvent.change(screen.getByLabelText('Heights (ft)'), { target: { value: '[10.0, 20.0, 30.0]' } });
    expect(screen.getByTestId("output").value).toBe('[0.1230, 0.2340]');

    // Input values for Fvx
    fireEvent.click(dropdown);
    fireEvent.click(screen.getByRole("option", { name: "Story Shear ( F vx )" }));
    fireEvent.change(screen.getByRole("textbox", { name: "C vx" }), { target: { value: '[0.123, 0.234]' } });
    fireEvent.change(screen.getByLabelText('V (kip)'), { target: { value: '1.234' } });
    expect(screen.getByTestId("output").value).toBe('[0.1230, 0.2340]');

    // Input values for Stiffness
    fireEvent.click(screen.getByText("Fundamental Period"));
    fireEvent.change(screen.getByLabelText('E'), { target: { value: '29000' } });
    fireEvent.change(screen.getByLabelText('I'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('h'), { target: { value: '10' } });
    expect(screen.getByTestId("output").value).toBe("1.2340");

    // // Input values for Fundamental Period
    fireEvent.click(dropdown);
    fireEvent.click(screen.getByRole("option", { name: "Fundamental Period" }));
    fireEvent.change(screen.getByLabelText('Stiffness (k)'), { target: { value: '29000' } });
    fireEvent.change(screen.getByLabelText('Weight (W)'), { target: { value: '100' } });
    expect(screen.getByTestId("output").value).toBe("2.3450");
  })
})