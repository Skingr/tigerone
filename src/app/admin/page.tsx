// TODO: Change font to Funnel Display: https://fonts.google.com/selection/embed. https://developers.google.com/fonts/docs/css2 
// Make less cramped. Move title and everything down. Maybe make grpah section just one graph that you can 
// scroll to different ones
'use client'; // This is a client-side component

import { Page } from 'openai/pagination';
import React, { useEffect, useState } from 'react';

import { Bar, Line } from 'react-chartjs-2';

import { BarElement, CategoryScale, Chart, LinearScale, LineElement, PointElement} from "chart.js";

Chart.register(CategoryScale);
Chart.register(BarElement);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

// <uniquifier>: Use a unique and descriptive class name
// <weight>: Use a value from 300 to 800

type Box = {
  title: string;
  content: string;
};

type GraphBox = {
  src: string;
  description: string;
}
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [1,2,3,4],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [1,2,3,4],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};




export default function AdminDash() {
  const [db, setdb] = useState(null);
  const fetchData = async() => {
    try {
      const response = await fetch('/api/admin', {
        method: 'GET',
      })
      if (!response.ok){
        throw new Error ('Failed');
      }
    const db = await response.json();
    setdb(db)
    console.log(typeof db)
    console.log(db) 
    console.log(db[0].userquery)
    }catch(err: any) {
      console.error(err)
    }
  }
  useEffect(() => {
    fetchData(); // gathers data from database when page is loaded, so will update on each refresh
  }, [])
  

// TODO: How do I make this mutable? And formatted right? Want an \n after every query
  const queryBox: Box = {title: 'Query box', content: ''}

  const graph1: Box = {title: 'Graph 1', content: ''}
  const graph2: Box = {title: 'Graph 2', content: 'graph here?'}
  const graph3: Box = {title: 'Graph 3', content: 'graph here?'}
  const graph4: Box = {title: 'Graph 4', content: 'graph here?'}
    
  const [db, setdb] = useState(null);

  const fetchData = async() => {
    try {
      const response = await fetch('/api/admin', {
        method: 'GET',
      })

      if (!response.ok){
        throw new Error ('Failed');
      }
    
    const db = await response.json();
    setdb(db)
    //console.log(data) 
    }catch(err: any) {
      console.error(err)
    }
  
  }

  useEffect(() => {
    fetchData(); // fetch data on page load
  }, []);



 

  return (
    <main className="font-crimsonPro min-h-screen bg-cc-gold-faint p-4 ">
      <style>
        @import url(`https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Funnel+Display:wght@300..800&display=swap`);
      </style>
      
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 border-b-8 border-double border-cc-gold">Student AI Use Information</h1>
      </header>

      {/* Content */}
      <div className="flex">
        {/* Left Side: Graphs */}

        <div className="flex-1 grid grid-cols-2 gap-4">
            {/*Graph1*/}
            <div
              className="border border-4 border-double border-cc-gold rounded p-4 shadow-lg h-60 ml-10 mb-10"
            >
              <h2 className="font-bold text-xl mb-2 text-cc-charcoal">{graph1.title}</h2>
              <p className='text-gray-600'>{graph1.content}</p>
              <Bar data={data}></Bar>
              
            </div>
            {/*Graph2*/}
            <div
              className="border border-4 border-double border-cc-gold rounded p-4 shadow-lg h-60 ml-10 "
            >
              <h2 className="font-bold text-xl mb-2 text-cc-charcoal">{graph2.title}</h2>
              <p className='text-gray-600'>{graph2.content}</p>
              <Line data={data} />

              </div>
              {/*Graph3*/}
            <div
              className="border border-4 border-double border-cc-gold rounded p-4 shadow-lg h-60 ml-10"
            >
              <h2 className="font-bold text-xl mb-2 text-cc-charcoal">{graph3.title}</h2>
              <p className='text-gray-600'>{graph3.content}</p>
              
            </div>
            {/*Graph4*/}
            <div
              className="border border-4 border-double border-cc-gold rounded p-4 shadow-lg h-60 ml-10 "
            >
              <h2 className="font-bold text-xl mb-2 text-cc-charcoal">{graph4.title}</h2>
              <p className='text-gray-600'>{graph4.content}</p>
              
            </div>
  
        </div>

        {/* Right Side: Data Box */}
        <div className="w-1/2 ml-4 mr-10 ml-10 ">
          <div className="border border-4 border-double border-cc-gold rounded p-4 shadow-lg min-h-full">
            <h2 className="font-bold text-xl mb-2 text-cc-charcoal">{queryBox.title}</h2>
            <p className='text-gray-600'>{queryBox.content}</p>
          </div>
        </div>
      </div>
    </main>
  );
}