import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

interface StackedBarChartProps {
  //get user year and major 
  userMajor: string[];
  userYear: string[];
  userID: string[];
}

const StackedBarChart: React.FC<StackedBarChartProps> = ({ userMajor, userYear, userID }) => {
  const userCountMap = userMajor.reduce((acc, major, index) => {
    const year = userYear[index];
    const id = userID[index];

    if (!acc[major]) {
      acc[major] = {};
    }
    if (!acc[major][year]) {
      acc[major][year] = new Set<string>();
    }
    acc[major][year].add(id);
    return acc;
  }, {} as Record<string, Record<string, Set<string>>>);

  console.log('User Count Map:', userCountMap);

  const majors = Object.keys(userCountMap);
  const years = Array.from(new Set(userYear));

  const colors = [
    'rgba(255, 231, 137, 0.5)',
    'rgba(255, 204, 0, 0.5)',
    'rgba(168, 135, 0, 0.5)',
    'rgba(67, 53, 0, 0.5)',
  ];

  const datasets = years.map((year, index) => {
    const data = majors.map((major) => userCountMap[major]?.[year]?.size || 0); // count unique users

    return {
      label: year,
      data: data,
      backgroundColor: colors[index % colors.length],
    };
  });

  // chart data
  const data = {
    labels: majors,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Majors',
        },
        ticks: {
          autoSkip: true, 
          maxRotation: 45, 
          minRotation: 45, 
          font: {
            size: 10, 
          },
        },
      },
      y: {
        stacked: true,
        title: {
          display: true,
          text: 'Number of Unique Users',
        },
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default StackedBarChart;