import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Tooltip, Legend } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(ArcElement, Tooltip, Legend);

interface DonutChartYearProps {
  userYear: string[];
}

const DonutChartYear: React.FC<DonutChartYearProps> = ({ userYear }) => {
  const data = {
    labels: userYear,
    datasets: [
      {
        label: '# of Queries',
        data: userYear.map((year) => userYear.filter((y) => y === year).length),
        backgroundColor: [
          'rgba(255, 231, 137, 0.5)',
          'rgba(255, 204, 0, 0.5)',
          'rgba(168, 135, 0, 0.5)',
          'rgba(67, 53, 0, 0.5)',
        ],
        borderColor: [
          'rgba(255, 231, 137, 0.5)',
          'rgba(255, 204, 0, 0.5)',
          'rgba(168, 135, 0, 0.5)',
          'rgba(67, 53, 0, 0.5)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default DonutChartYear;