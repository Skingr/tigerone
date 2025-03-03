// TODO: Change font to Funnel Display: https://fonts.google.com/selection/embed. https://developers.google.com/fonts/docs/css2 
// Make less cramped. Move title and everything down. Maybe make grpah section just one graph that you can 
// scroll to different ones
'use client'; // This is a client-side component

import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import { ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Tooltip} from "chart.js";
import { Doughnut } from 'react-chartjs-2';
import { organizeData } from './organizeData'; 
import LinChart from './linChart';
import CourseDropdown from './CourseDrop';
import MessageTheme from './MessageThemes';
import SentimentChart from './sentimentChart';
import QueryBox from './QueryBox';


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
    userMajor: string; 
    convoID: string;
  }[]>();
  const [filteredDb, setFilteredDb] = useState<{
    userQuery: string;
    aiResponse: string;
    userClass: string;
    createdAt: string; 
    userYear: string;
    userMajor: string;
    convoID: string;
  }[]>();
  const [loading] = useState(false);
  const [db, setdb] = useState<{ 
    role: string;
    messageContent: string;
    userClass: string;
    createdAt: string;
    userYear: string;
    userMajor: string;
    convoID: string;

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
    //console.log(db)
   
    function formatDate(date: string){
      const hour = new Date(date).getHours();
      const amPm = hour >= 12 ? "PM" : "AM";
      
      const formatHour = ((hour %12)||12);// hour now works in AM/PM form, no issues

  
      return `${formatHour} ${amPm}` //Old: ${mm}/${dd}/${yy.slice(-2)} at 
    }
  
 
  const donData = {
    labels: filteredDb ? [...new Set(filteredDb.map(item => item.userYear))] : [],
    datasets: [
      {
        label: '# of Queries',
        data:  filteredDb ? [...new Set(filteredDb.map(item => item.userYear))].map(major => filteredDb.filter(item => item.userYear == major).length)
        : [],
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
  const donData2 = {
    labels: filteredDb ? [...new Set(filteredDb.map(item => item.userMajor))] : [],
    datasets: [
      {
        label: '# of Queries',
        data: filteredDb ? [...new Set(filteredDb.map(item => item.userMajor))].map(major => filteredDb.filter(item => item.userMajor == major).length)
          : [],
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
    <main className="font-crimsonPro min-h-screen bg-white p-4 relative">
  {!selectedCourse && (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <CourseDropdown
        selectedCourse={selectedCourse}
        setSelectedCourse={setSelectedCourse}
        disabled={false}
      />
    </div>
  )}

  <header className="mb-6 text-center">
    <h1 className="text-4xl font-bold text-gray-800 border-gray-200 font-bebas">
      Admin Dashboard
    </h1>
  </header>

  <div className="bg-gray-100 p-6 rounded-lg shadow-lg min-h-[calc(100vh-8rem)] flex flex-col">
    <div className="flex">
      <div className="flex-1 grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="font-bold text-xl mb-2 text-gray-800 text-center font-bebas">
            User Major Distribution
          </h2>
          <div className="w-48 h-48 mx-auto"> 
            <Doughnut
              data={donData2}
              options={{
                responsive: true,
                maintainAspectRatio: false, 
              }}
            />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="font-bold text-xl mb-2 text-gray-800 text-center font-bebas">
            Usage
          </h2>
          <LinChart data={organizedDb} />
        </div>

        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="font-bold text-xl mb-2 text-gray-800 text-center font-bebas">
            Most Common Nouns and Verbs
          </h2>
          <MessageTheme data={organizedDb} />
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="font-bold text-xl mb-2 text-gray-800 text-center font-bebas">
            User Year Distribution
          </h2>
          <div className="w-48 h-48 mx-auto"> 
            <Doughnut
              data={donData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
        <div className="col-span-2 bg-white rounded-lg p-4 shadow-md">
          <h2 className="font-bold text-xl mb-2 text-gray-800 text-center font-bebas">
            Recent Sentiment
          </h2>
          <div className="h-64"> 
          <SentimentChart data={organizedDb} />
          </div>
        </div>
      </div>
      <div className="w-1/2 ml-6">
        <div className="bg-white rounded-lg p-4 shadow-md h-[34rem]">
          <QueryBox
            data={filteredDb}
            userInput={userInput}
            setUserInput={setUserInput}
            loading={loading}
          />
        </div>
      </div>
    </div>
  </div>
</main>
);
}
