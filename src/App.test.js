import { render, screen, act, within, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import React from 'react';
import App from './App';
import Lectures from './components/Lectures'
import { BrowserRouter } from 'react-router-dom';
// use xit to temp exclude tests


it('renders home page', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  expect(screen.getAllByText('Lectures')[0]).toBeInTheDocument();
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
  expect(screen.queryByText(/Show All Lectures/i)).not.toBeInTheDocument();

  await act( async () => {
    //click on the exam resources button in the header
    await user.click(screen.getAllByText(/Lectures/i)[0]);
  });

  //dropdown for first lecture should be visible
  expect(screen.getByText(/Show All Lectures/i)).toBeInTheDocument();

  await act( async () => {
    //click off the lecture dropdown
    await user.click(screen.getByTestId('testBlankDiv'));
  });

  expect(screen.queryByText(/Show All Lectures/i)).not.toBeInTheDocument();
});

it('renders footer', () => {
  render(<BrowserRouter><App /></BrowserRouter>);
  const footer = screen.getByRole('contentinfo');
  expect(footer).toBeInTheDocument();

  //check if LinkedIn svg rendered correctly with a link to the company website
  expect(within(footer).getByTitle('LinkedIn')).toBeInTheDocument();
  expect(within(footer).getAllByRole('link')[0]).toHaveAttribute('href', 'http://linkedin.com/company/californiaseismic');
});

it('renders lecture landing page', async () => {
  render(<Lectures display={true}/>);
  expect(screen.getAllByText('Lectures')[0]).toBeInTheDocument();
  const articles = screen.getAllByRole('article');

  //should be many articles for many lectures
  expect(articles.length).toBeGreaterThan(10);

  //should have no border by default
  expect(articles[1]).toHaveStyle(`border-color: "transparent"`);

  //should have border on hover
  fireEvent.mouseEnter(articles[1]);
  expect(articles[1]).toHaveStyle(`border-width: "2px"`);

});