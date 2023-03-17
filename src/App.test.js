import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
//import { render, unmountComponentAtNode } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
// use xit to temp exclude tests

//let container = null;

/* beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
}); */

/* it('renders without crashing', () => {
  render(<BrowserRouter><App /></BrowserRouter>, container);
});

it('routes to the correct component in when header link clicked', () => {
  render(<BrowserRouter><App /></BrowserRouter>, container);
}); */

it('renders', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  expect(screen.getByText('Lectures')).toBeInTheDocument();
});
/*
test('renders without crashing', () => {
  render(<App />);
});

test('renders exam resources page on click from header', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */