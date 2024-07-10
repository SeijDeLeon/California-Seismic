import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const data = {
  labels: ['Incorrect', 'Correct'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 43],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',

      ],
      borderWidth: 1,
    },
  ],
};

export function ResultChart() {
  const options = {
   plugins: {
    title: {
      display: true,
      text: 'helo',
    },
    legend: {
      position: 'right'
    }
   }
  }
  return <Doughnut data={data} options={options}/>
}