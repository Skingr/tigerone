// TODO: Change font to Funnel Display: https://fonts.google.com/selection/embed. https://developers.google.com/fonts/docs/css2 
// Make less cramped. Move title and everything down. Maybe make grpah section just one graph that you can 
// scroll to different ones
'use client'; // This is a client-side component

import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import { ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Tooltip} from "chart.js";
import { Doughnut } from 'react-chartjs-2';
import AdminSearch from '@/components/AdminSearch';
import { getHighlightedText } from '@/components/HighlightText';
import { organizeData } from './organizeData'; 
import LinChart from './linChart';
import CourseDropdown from './CourseDrop';
import MessageTheme from './MessageThemes';
import SentimentChart from './sentimentChart';


Chart.register(CategoryScale);
Chart.register(BarElement);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);

// <uniquifier>: Use a unique and descriptive class name
// <weight>: Use a value from 300 to 800

Chart.register(ArcElement, Tooltip, Legend);


type Box = {
  title: string;
  content: string;
};

type GraphBox = {
  src: string;
  description: string;
}

export default function AdminDash() {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [userInput, setUserInput] = useState("");
  const [organizedDb, setOrganizedDb] = useState<{
    userQuery: string;
    aiResponse: string;
    userClass: string;
    createdAt: string; 
    userYear: string;
    userMajor: string; }[]>();
  const [filteredDb, setFilteredDb] = useState<{
    userQuery: string;
    aiResponse: string;
    userClass: string;
    createdAt: string; 
    userYear: string;
    userMajor: string;}[]>();
  const [loading] = useState(false);
  const [db, setdb] = useState<{ 
    role: string;
    messageContent: string;
    userClass: string;
    createdAt: string;
    userYear: string;
    userMajor: string;
  }[]>();

    // get data from db


  const fetchData = async(selectedCourse: string) => {
      try {
        const response = await fetch(`/api/admin?selectedClass=${encodeURIComponent(selectedCourse)}`, {
          method: 'GET',
        })
        if (!response.ok){
          throw new Error ('Failed');
        }
      const db = await response.json();
      setdb(db)
      //console.log(db)

      const timestamps = db.map((entry: { created_at: string }) => entry.created_at);
    }catch(err: any) {
        console.error(err)
      }
    }

    // gathers data from database when class is selected
    useEffect(() => {
      if (selectedCourse){
        fetchData(selectedCourse); 
        //console.log('sl',selectedCourse);
      }
    }, [selectedCourse]) 
    // organize data
    useEffect(() => {
      if(db){
        setOrganizedDb(organizeData(db));
      }
    }, [db])

    useEffect(() => {
      if (!organizedDb) return; 
      const finalFilteredDb = userInput.trim() == "" ? organizedDb : organizedDb.filter(item => item.userQuery.toLowerCase().includes(userInput.toLowerCase()) 
      || item.aiResponse.toLowerCase().includes(userInput.toLowerCase())
          );
    
      setFilteredDb(finalFilteredDb);
    }, [userInput, organizedDb]);
    console.log(db)
   
    function formatDate(date: string){
      const hour = new Date(date).getHours();
      const amPm = hour >= 12 ? "PM" : "AM";
      
      const formatHour = ((hour %12)||12);// hour now works in AM/PM form, no issues

  
      return `${formatHour} ${amPm}` //Old: ${mm}/${dd}/${yy.slice(-2)} at 
    }

  const queryBox = {
    title: "Query box",
    content: filteredDb && filteredDb.length > 0 ? (
      <div className="overflow-y-auto max-h-96 border rounded-lg p-3">
        {filteredDb.map((msg, index) => (
          <div key={index} className="border-b py-1">
            <b>Student Query:</b> {getHighlightedText(msg.userQuery, userInput)}
            <br />
            <b>AI Response:</b> {getHighlightedText(msg.aiResponse, userInput)}
            <br />
            <b>Timestamp:</b> {formatDate(msg.createdAt)}
            <br />
          </div>
        ))}
      </div>
    ) : (
      <p>{filteredDb ? "No results found." : "Loading..."}</p>
    ),
  };
  
 
  const donData = {
    labels: filteredDb ? [...new Set(filteredDb.map(item => item.userYear))] : [],
    datasets: [
      {
        label: '# of Queries',
        data:  filteredDb ? [...new Set(filteredDb.map(item => item.userYear))].map(major => filteredDb.filter(item => item.userYear == major).length)
        : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',

        ],
        borderWidth: 1,
      },
    ],
  };
  const donData2 = {
    labels: filteredDb ? [...new Set(filteredDb.map(item => item.userMajor))] : [],
    datasets: [
      {
        label: '# of Queries',
        data: filteredDb ? [...new Set(filteredDb.map(item => item.userMajor))].map(major => filteredDb.filter(item => item.userMajor == major).length)
          : [],
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
    if (filteredDb) {
    const countMap: Record<string, number> = {};
  
    for (const item of filteredDb) {
      if (countMap[item.userClass]) {
        countMap[item.userClass] += 1;
      } else {
        countMap[item.userClass] = 1;
      }
    }
  
    donData.datasets[0].data = Object.values(countMap);
  }

   const graph1: Box = {title: 'Usage', content: 'Students usage over time'}
   const graph2: Box = {title: 'Graph 2', content: 'graph here?'}
   const graph3: Box = {title: 'Graph 3', content: 'graph here?'}
   const graph4: Box = {title: 'Graph 4', content: 'graph here?'}

   return (
    <main className="font-crimsonPro min-h-screen bg-cc-white p-4 relative">
     {!selectedCourse && (
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
        <CourseDropdown
          selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          disabled={false}
        />
     </div>
  )}
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 border-b-8 border-cc-gold font-bebas text-cc-gold">
          Admin Dashboard
        </h1>
      </header>
      <div className="flex">
        {/* Left Side: Graphs */}
        
        <div className="flex-1 grid grid-cols-2 gap-4 content-center grid-rows-2 min-w-[50vw]">
            {/*Graph1*/}
            <div
              className="border border-4  border-cc-gold rounded p-4 shadow-lg h-60 ml-10 mb-10 justify-center col-span-2 flex flex-col items-center "
            >
              <h2 className="font-bold text-xl mb-2 text-cc-charcoal text-center font-bebas">{graph1.title}</h2>
              {/* <p className='text-gray-600'>{graph1.content}</p> */}
              {/* <Bar data={data}></Bar> */}
  
              <LinChart data={organizedDb}/>
            </div>
            <div
              className="border border-4  border-cc-gold rounded p-4 shadow-lg h-60 ml-10 mb-10 justify-center col-span-2 flex flex-col items-center "
            >
              <h2 className="font-bold text-xl mb-2 text-cc-charcoal text-center font-bebas">Most Common Nouns and Verbs</h2>
              {/* <p className='text-gray-600'>{graph1.content}</p> */}
              {/* <Bar data={data}></Bar> */}
  
              <MessageTheme data={organizedDb}/>
            </div>
            <div
              className="border border-4  border-cc-gold rounded p-4 shadow-lg h-60 ml-10 mb-10 justify-center col-span-2 flex flex-col items-center "
            >
              <h2 className="font-bold text-xl mb-2 text-cc-charcoal text-center font-bebas">Recent Sentiment</h2>
              {/* <p className='text-gray-600'>{graph1.content}</p> */}
              {/* <Bar data={data}></Bar> */}
  
              <SentimentChart data={organizedDb}/>
            </div>
          </div>
        {/* Right Side: Data Box and Doughnut Charts */}
        <div className="w-1/2 mr-10 ml-10">
        {/* Query Box */}
        <div className="h-[34rem] border border-4 border-double border-cc-gold rounded p-4 shadow-lg mb-6">
          <h2 className="font-bold text-xl mb-2 text-cc-charcoal">
            {queryBox.title}
          </h2>
          <AdminSearch
            userInput={userInput}
            setUserInput={setUserInput}
            loading={loading}
          />
          <div>{queryBox.content}</div>
        </div>
        <div className="h-6"></div>
        {/* Doughnut Charts */}
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-4 border-cc-gold rounded p-0 shadow-lg h-60 flex items-center justify-center">
            <Doughnut data={donData} style={{ width: "100%", height: "100%" }} />
          </div>
          <div className="border border-4 border-cc-gold rounded p-0 shadow-lg h-60 flex items-center justify-center">
            <Doughnut data={donData2} style={{ width: "100%", height: "100%" }} />
          </div>
        </div>
      </div>
    </div>
  </main>
)}
  