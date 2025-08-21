import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Output from '../../components/features/DiaphragmAnalysis/Output';

// Suppress React act warnings
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('Warning: `ReactDOMTestUtils.act` is deprecated')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Mock MathJax to prevent "MathJax was not loaded" error
jest.mock('better-react-mathjax', () => ({
  MathJax: ({ children }) => <span data-testid="mathjax">{children}</span>,
  MathJaxContext: ({ children }) => <div data-testid="mathjax-context">{children}</div>
}));





describe('Output Component', () => {
  const mockInputs = {
    wallLines: [
      { wall: 'A', openings: [[4, 12]], length: 28 },
      { wall: 'B', openings: [], length: 28 },
    ],
    horizontalWallLengths: [30],
    uniformForces: [{ startForce: 100, endForce: 100 }],
  };

  const mockSolution = {
    wallLines: [
      { wall: 'A', wallShear: 1500, diaUnitShearLeft: null, diaUnitShearRight: 53.57 },
      { wall: 'B', wallShear: 1500, diaUnitShearLeft: 53.57, diaUnitShearRight: null },
    ]
  };

  const mockSetSolution = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders Output component with title', () => {
      render(
        <Output 
          inputs={mockInputs} 
          solution={mockSolution} 
          setSolution={mockSetSolution} 
        />
      );

      expect(screen.getByText('Output')).toBeInTheDocument();
      expect(screen.getByText('Output')).toHaveClass('text-blue-600', 'text-xl', 'font-semibold');
    });

    test('renders both Chord Force and Collector Force cards', () => {
      render(
        <Output 
          inputs={mockInputs} 
          solution={mockSolution} 
          setSolution={mockSetSolution} 
        />
      );

      expect(screen.getByText('Chord Force')).toBeInTheDocument();
      expect(screen.getByText('Collector Force')).toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    test('Chord Force card expands when clicked', async () => {
      render(
        <Output 
          inputs={mockInputs} 
          solution={mockSolution} 
          setSolution={mockSetSolution} 
        />
      );

      const chordForceTitle = screen.getByText('Chord Force');
      
      // Initially collapsed
      expect(screen.queryByText('Description')).not.toBeInTheDocument();

      // Click to expand
      fireEvent.click(chordForceTitle);

      // Verify content appears
      await waitFor(() => {
        expect(screen.getByText('Description')).toBeInTheDocument();
      });
    });

    test('Collector Force card expands when clicked', async () => {
      render(
        <Output 
          inputs={mockInputs} 
          solution={mockSolution} 
          setSolution={mockSetSolution} 
        />
      );

      const collectorForceTitle = screen.getByText('Collector Force');
      
      // Initially collapsed
      expect(screen.queryByText('Description')).not.toBeInTheDocument();

      // Click to expand
      fireEvent.click(collectorForceTitle);

      // Verify content appears
      await waitFor(() => {
        expect(screen.getByText('Description')).toBeInTheDocument();
      });
    });

    test('cards collapse when clicked again', async () => {
      render(
        <Output 
          inputs={mockInputs} 
          solution={mockSolution} 
          setSolution={mockSetSolution} 
        />
      );

      const chordForceTitle = screen.getByText('Chord Force');
      
      // Expand
      fireEvent.click(chordForceTitle);
      await waitFor(() => {
        expect(screen.getByText('Description')).toBeInTheDocument();
      });

      // Collapse
      fireEvent.click(chordForceTitle);
      await waitFor(() => {
        expect(screen.queryByText('Description')).not.toBeInTheDocument();
      });
    });

    test('MathJax content renders without errors', async () => {
      render(
        <Output 
          inputs={mockInputs} 
          solution={mockSolution} 
          setSolution={mockSetSolution} 
        />
      );

      const chordForceTitle = screen.getByText('Chord Force');
      fireEvent.click(chordForceTitle);

      await waitFor(() => {
        // Check that MathJax components are rendered
        const mathJaxElements = screen.getAllByTestId('mathjax');
        expect(mathJaxElements.length).toBeGreaterThan(0);
      });
    });
  });

  
});
