import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Solver from '../../components/features/Solver/Solver.jsx';

// Mock the calculation functions
jest.mock('../../assets/data/calculations/calculateCs', () => jest.fn(() => 0.1234));
jest.mock('../../assets/data/calculations/calculateV', () => jest.fn(() => 1.234));
jest.mock('../../assets/data/calculations/calculateCvx', () => jest.fn(() => [0.123, 0.234]));
jest.mock('../../assets/data/calculations/calculateFvx', () => jest.fn(() => [0.123, 0.234]));
jest.mock('../../assets/data/calculations/calculateStiffness', () => jest.fn(() => 1.234));
jest.mock('../../assets/data/calculations/calculateFundamentalPeriod', () => jest.fn(() => 2.345));

describe('Solver component', () => {
  test('performs calculations and displays results', async () => {
    render(<Solver />);

    // Input values for Cs
    fireEvent.change(screen.getByPlaceholderText('[float, float, ...]'), { target: { value: '0.5' } });
    fireEvent.change(screen.getByPlaceholderText('[float, float, ...]'), { target: { value: '0.5' } });
    fireEvent.change(screen.getByPlaceholderText('float'), { target: { value: '1.0' } });
    fireEvent.change(screen.getByPlaceholderText('float'), { target: { value: '1.0' } });
    fireEvent.change(screen.getByPlaceholderText('float'), { target: { value: '5.0' } });
    fireEvent.change(screen.getByPlaceholderText('float'), { target: { value: '0.2' } });
    fireEvent.change(screen.getByPlaceholderText('float'), { target: { value: '8.0' } });

    fireEvent.click(screen.getByText(/Calculate Cs/i));
    await waitFor(() => {
      expect(screen.getByText(/Seismic Response Coefficient \(C_s\): 0.1234/i)).toBeInTheDocument();
    });

    // Input values for V
    fireEvent.change(screen.getByPlaceholderText('float'), { target: { value: '0.1234' } });
    fireEvent.change(screen.getByPlaceholderText('[float, float, ...]'), { target: { value: '[1.0, 2.0, 3.0]' } });

    fireEvent.click(screen.getByText(/Calculate V/i));
    await waitFor(() => {
      expect(screen.getByText(/Seismic Base Shear \(V\): 1.234/i)).toBeInTheDocument();
    });

    // Input values for Cvx
    fireEvent.change(screen.getByPlaceholderText('[float, float, ...]'), { target: { value: '[1.0, 2.0, 3.0]' } });
    fireEvent.change(screen.getByPlaceholderText('[float, float, ...]'), { target: { value: '[10.0, 20.0, 30.0]' } });

    fireEvent.click(screen.getByText(/Calculate Cvx/i));
    await waitFor(() => {
      expect(screen.getByText(/Vertical Distribution Factor \(C_vx\): 0.123, 0.234/i)).toBeInTheDocument();
    });

    // Input values for Fvx
    fireEvent.change(screen.getByPlaceholderText('[float, float, ...]'), { target: { value: '[0.123, 0.234]' } });
    fireEvent.change(screen.getByPlaceholderText('float'), { target: { value: '1.234' } });

    fireEvent.click(screen.getByText(/Calculate Fvx/i));
    await waitFor(() => {
      expect(screen.getByText(/Story Shear \(F_vx\): 0.123, 0.234/i)).toBeInTheDocument();
    });

    // Input values for Stiffness
    fireEvent.change(screen.getByPlaceholderText('float'), { target: { value: '29000' } });
    fireEvent.change(screen.getByPlaceholderText('float'), { target: { value: '100' } });
    fireEvent.change(screen.getByPlaceholderText('float'), { target: { value: '10' } });

    fireEvent.click(screen.getByText(/Calculate Stiffness/i));
    await waitFor(() => {
      expect(screen.getByText(/Stiffness \(k\): 1.234/i)).toBeInTheDocument();
    });

    // Input values for Fundamental Period
    fireEvent.change(screen.getByPlaceholderText('float'), { target: { value: '1000' } });

    fireEvent.click(screen.getByText(/Calculate Fundamental Period/i));
    await waitFor(() => {
      expect(screen.getByText(/Fundamental Period \(T\): 2.345/i)).toBeInTheDocument();
    });
  });
});

