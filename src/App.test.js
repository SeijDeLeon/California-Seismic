import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

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

it('renders exam guide page when clicked from header', async () => {
  const user = userEvent.setup();
  render(<BrowserRouter><App /></BrowserRouter>);

  //click on the exam resources button in the header
  await act( async () => {
    await user.click(screen.getAllByText(/Exam Guide/i)[0]);
  })

  expect(screen.getByTestId('testExamGuideh1')).toBeInTheDocument();
});


it('opens and closes lectures dropdown in header when clicked and off-clicked', async () => {
  const user = userEvent.setup();
  render(<BrowserRouter><App /></BrowserRouter>);
  expect(screen.queryByText(/Lecture 01/i)).not.toBeInTheDocument();

  await act( async () => {
    //click on the exam resources button in the header
    await user.click(screen.getByText(/Lectures/i));
  });

  //dropdown for first lecture should be visible
  expect(screen.getByText(/Lecture 01/i)).toBeInTheDocument();

  await act( async () => {
    //click off the lecture dropdown
    await user.click(screen.getByTestId('testBlankDiv'));
  });

  expect(screen.queryByText(/Lecture 01/i)).not.toBeInTheDocument();
});
