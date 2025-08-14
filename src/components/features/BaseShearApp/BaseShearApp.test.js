import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BaseShearApp from './BaseShearApp';

// Mock all the problematic dependencies causing issues
jest.mock('react-plotly.js', () => {
  return function MockPlot() {
    return <div data-testid="mock-plot">Mock Plot</div>;
  };
});

jest.mock('better-react-mathjax', () => ({
  MathJax: ({ children }) => <span>{children}</span>,
  MathJaxContext: ({ children }) => <div>{children}</div>,
}));

jest.mock('../../../assets/data/calculations/calculateBaseShearUnits', () => ({
  calculateBaseShearUnits: {
    getFloorsFromBottom: jest.fn((floors) => {
      const defaultFloors = [{ height: 20, weight: 100000, bottom: 0 }];
      if (!floors || !Array.isArray(floors)) return defaultFloors;
      return floors.map((floor, index) => ({
        ...floor,
        bottom: index * 20,
        height: floor.height || 20,
        weight: floor.weight || 100000,
      }));
    }),
    getFv: jest.fn(() => 1.5),
    getFa: jest.fn(() => 1.2),
    getSMS: jest.fn(() => 1.8),
    getSM1: jest.fn(() => 0.72),
    getSDS: jest.fn(() => 1.2),
    getSD1: jest.fn(() => 0.48),
    getTs: jest.fn(() => 0.4),
    getCs: jest.fn(() => ({
      Cs_initial: 0.24,
      Cs_min: 0.053,
      Cs_max: 0.32,
      Cs_final: 0.24,
    })),
    getSDC: jest.fn(() => 'D'),
    getV: jest.fn(() => 24000),
    getCvx: jest.fn(() => [1.0]),
    getFvx: jest.fn(() => [24000]),
  },
}));

jest.mock('./RenderSVG', () => {
  return function MockRenderSVG() {
    return <div data-testid="mock-svg">Mock SVG</div>;
  };
});

jest.mock('./Plot', () => {
  return function MockDisplacementPlot() {
    return <div data-testid="mock-displacement-plot">Mock Displacement Plot</div>;
  };
});

jest.mock('./useBaseShearState', () => ({
  useBaseShearState: () => ({
    inputs: {
      selectedRisk: "II - Regular Building",
      selectedSiteClass: "D - Default",
      selectedSystem: "Shear Wall (R = 5.0)",
      shortPeriodSpectralAcceleration: "1.50",
      longPeriodSpectralAcceleration: "0.60",
      longPeriodTransitionPeriod: "8.00",
      Ie: "1.00",
      R: "5.00",
      T: "1.00",
      floors: [{ height: 20, weight: 100000 }],
    },
    setInputs: jest.fn(),
    results: [
      { key: 'V', value: 24000 },
      { key: 'Fvx', value: [24000] },
      { key: 'storyVs', value: [24000] },
      { key: 'totalHeight', value: 20 },
    ],
    updatedFloors: [{ height: 20, weight: 100000, bottom: 0 }],
    isLoading: false,
    resetInputs: jest.fn(),
  }),
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

Object.defineProperty(global, 'localStorage', {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1920,
});

describe('BaseShearApp', () => {
  test('renders without crashing', () => {
    const { container } = render(<BaseShearApp />);
    expect(container).toBeTruthy();
    expect(container).toBeInTheDocument();
  });

  test('user can interact with a button', async () => {
    const user = userEvent.setup();
    render(<BaseShearApp />);
    const buttons = screen.queryAllByRole('button');
    
    expect(screen.getByText(/base shear calculator/i)).toBeInTheDocument();

    if (buttons.length > 0) {
      await user.click(buttons[0]);
    }

  });
});
