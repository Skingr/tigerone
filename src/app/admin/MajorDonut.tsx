import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { ArcElement, Tooltip, Legend } from 'chart.js';
import Chart from 'chart.js/auto';

Chart.register(ArcElement, Tooltip, Legend);

interface DonutChartMajorProps {
  userMajor: string[];
}

const DonutChartMajor: React.FC<DonutChartMajorProps> = ({ userMajor }) => {
  const data = {
    labels: userMajor,
    datasets: [
      {
        label: '# of Queries',
        data: userMajor.map((major) => userMajor.filter((m) => m === major).length),
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

export default DonutChartMajor;