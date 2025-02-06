// TODO: Change font to Funnel Display: https://fonts.google.com/selection/embed. https://developers.google.com/fonts/docs/css2 
// Make less cramped. Move title and everything down. Maybe make grpah section just one graph that you can 
// scroll to different ones
'use client'; // This is a client-side component

import React, { useEffect, useState } from 'react';

import { Bar, Line } from 'react-chartjs-2';
import _ from 'lodash';

import { ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Tooltip} from "chart.js";
import moment from 'moment';
import { Doughnut } from 'react-chartjs-2';
import AdminSearch from '@/components/AdminSearch';
import { getHighlightedText } from '@/components/HighlightText';

import { Sora } from 'next/font/google';
import LinChart from './linChart';

Chart.register(CategoryScale);
Chart.register(BarElement);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

// <uniquifier>: Use a unique and descriptive class name
// <weight>: Use a value from 300 to 800

Chart.register(ArcElement, Tooltip, Legend);

const donData = {
  labels: [  'Linear Algebra', 'Cultural Anthropology', 'General Chemistry'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19,22],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

type Box = {
  title: string;
  content: string;
};

type GraphBox = {
  src: string;
  description: string;
}




export default function AdminDash() {
  const [userInput, setUserInput] = useState("");
  const [filteredDb, setFilteredDb] = useState<{
    role: string;
    messageContent: string;
    userClass: string;
    createdAt: string }[]>();
  const [loading] = useState(false);
  const [db, setdb] = useState<{ 
    role: string;
    messageContent: string;
    userClass: string;
    createdAt: string }[]>();

    // get data from db


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
      //console.log(db)
      setFilteredDb(db)

      const timestamps = db.map((entry: { created_at: string}) => entry.created_at);

      //console.log(typeof db)
      //console.log(db) 
      //console.log(db[0].userquery)
      
    
    
      }catch(err: any) {
        console.error(err)
      }
    }

    // gathers data from database when page is loaded, so will update on each refresh
    useEffect(() => {
      fetchData(); 
    }, []) 
  
    // filter based on user typing
    useEffect(() => {
      if (userInput.trim() == ""){ // no user input 
        setFilteredDb(db) // everything
      } else if (db){
        const filteredResults = db.filter (item => 
          item.messageContent.toLowerCase().includes(userInput.toLowerCase()) // filter based on what user types non case senestive
        );
        setFilteredDb(filteredResults)
      }

    }, [userInput]) 


  function formatDate(date: string){
    const calendarDate = date.split('T')[0];
    const time = date.split('T')[1].split('.')[0]
    const [yy,mm,dd] = calendarDate.split('-')
    let modifiedTime = Math.abs((parseInt(time.slice(0, 2)) -7) %12)
    let amPm = "AM"
    if(modifiedTime>12){
      amPm = "PM"
    }
    if(modifiedTime == 0){
      modifiedTime = 12;
    }

    return `${modifiedTime} ${amPm}` //Old: ${mm}/${dd}/${yy.slice(-2)} at 
  }

  const queryBox = {
    title: 'Query box',
    content: filteredDb && filteredDb.length > 0? (
        <div className="overflow-y-auto max-h-96 border rounded-lg p-3">
          {filteredDb.map((msg, index) => {
            if (index % 2 === 0) {
              const userMsg = msg;
              const aiResponse = filteredDb[index + 1];
              
              return (
                <div key={index} className="border-b py-1">
                  <b>Student Query:</b> {getHighlightedText(userMsg.messageContent, userInput)}<br />
                  {aiResponse && (
                    <>
                      <b>AI Response: </b>{getHighlightedText(aiResponse.messageContent, userInput)}<br />
                    </>
                  )}
                  <b>Student Course: </b>{userMsg.userClass}<br />
                  <b>Timestamp:</b>{formatDate(userMsg.createdAt)}<br />
  
                </div>
              );
            }
            
            return null;
          })}
        </div>
    ) : (
      <p>{filteredDb ? "No results found." : "Loading..."}</p>
    )
  };
 


   const graph1: Box = {title: 'Usage', content: 'Students usage over time'}
   const graph2: Box = {title: 'Graph 2', content: 'graph here?'}
   const graph3: Box = {title: 'Graph 3', content: 'graph here?'}
   const graph4: Box = {title: 'Graph 4', content: 'graph here?'}

  return (
    <main className="font-crimsonPro min-h-screen bg-cc-gold-faint p-4 ">
      
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 border-b-8 border-double border-cc-gold">Student AI Use Information</h1>
      </header>

      {/* Content */}
      <div className="flex">
        {/* Left Side: Graphs */}

        <div className="flex-1 grid grid-cols-2 gap-4 content-center grid-rows-2">
            {/*Graph1*/}
            <div
              className="border border-4 border-double border-cc-gold rounded p-4 shadow-lg h-60 ml-10 mb-10 justify-center col-span-2 flex flex-col items-center "
            >
              <h2 className="font-bold text-xl mb-2 text-cc-charcoal text-center">{graph1.title}</h2>
              {/* <p className='text-gray-600'>{graph1.content}</p> */}
              {/* <Bar data={data}></Bar> */}
  
              <LinChart />

              
            </div>
        
            
            {/*Graph4*/}
            <div
              className="border border-4 border-double border-cc-gold rounded p-0 shadow-lg h-60 ml-10 flex items-center justify-center"
            >
             
             <Doughnut data={donData} className="mx-auto p-3"/>
              </div>
              <div
              className="border border-4 border-double border-cc-gold rounded p-0 shadow-lg h-60 ml-10 flex items-center justify-center"
            >
             
             <Doughnut data={donData} className="mx-auto p-3"/>
              </div>
        </div>

        {/* Right Side: Data Box */}
        <div className="w-1/2  mr-10 ml-10 ">
          <div className="border border-4 border-double border-cc-gold rounded p-4 shadow-lg min-h-full">
            <h2 className="font-bold text-xl mb-2 text-cc-charcoal">{queryBox.title}</h2>
            <AdminSearch
                    userInput={userInput} 
                    setUserInput={setUserInput}
                    loading={loading}
                  />
            <div>{queryBox.content}</div>
          </div>
        </div>
      </div>
    </main>
  );
}


