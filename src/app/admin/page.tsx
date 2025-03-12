'use client';

import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Tooltip} from "chart.js";
import { organizeData } from './organizeData'; 
import LinChart from './linChart';
import CourseDropdown from './CourseDrop';
import MessageTheme from './MessageThemes';
import SentimentChart from './sentimentChart';
import QueryBox from './QueryBox';
import MajorYear from './MajorYear';

Chart.register(CategoryScale, BarElement, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

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
  const [organizedDb, setOrganizedDb] = useState<any[]>([]);
  const [filteredDb, setFilteredDb] = useState<any[]>([]);
  const [loading] = useState(false);
  const [db, setdb] = useState<any[]>([]);

  const fetchData = async (selectedCourse: string) => {
    try {
      const response = await fetch(`/api/admin?selectedClass=${encodeURIComponent(selectedCourse)}`);
      if (!response.ok) throw new Error('Failed');
      const db = await response.json();
      setdb(db);
    } catch (err: any) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (selectedCourse) fetchData(selectedCourse);
  }, [selectedCourse]);

  useEffect(() => {
    if (db) setOrganizedDb(organizeData(db));
  }, [db]);

  useEffect(() => {
    if (!organizedDb) return;
    setFilteredDb(userInput.trim() === "" ? organizedDb : organizedDb.filter(item => 
      item.userQuery.toLowerCase().includes(userInput.toLowerCase()) || 
      item.aiResponse.toLowerCase().includes(userInput.toLowerCase())
    ));
  }, [userInput, organizedDb]);

  const majors = filteredDb.map(item => item.userMajor);
  const years = filteredDb.map(item => item.userYear);
  const ids = filteredDb.map(item=>item.userID);

  return (
    <main className="font-crimsonPro min-h-screen bg-white p-4 relative">
      {!selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <CourseDropdown selectedCourse={selectedCourse} setSelectedCourse={setSelectedCourse} disabled={false} />
        </div>
      )}
  
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800 border-gray-200 font-bebas">Admin Dashboard</h1>
      </header>
  
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg min-h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex">
          <div className="flex-1 grid grid-cols-2 gap-6 min-h-full">
            <div className="bg-white rounded-lg p-4 shadow-md h-64 min-h-[16rem] flex flex-col justify-center">
              <h2 className="font-bold text-xl mb-2 text-gray-800 text-center font-bebas">Usage</h2>
              <LinChart data={organizedDb} />
            </div>
            <div className="bg-white rounded-lg p-4 shadow-md h-64 min-h-[16rem] flex flex-col justify-center">
              <h2 className="font-bold text-xl mb-2 text-gray-800 text-center font-bebas">Recent Sentiment</h2>
              <div className="h-48"> 
                <SentimentChart data={organizedDb} />
              </div>
            </div>
  
            <div className="bg-white rounded-lg p-4 shadow-md h-64 min-h-[16rem] flex flex-col justify-center">
              <h2 className="font-bold text-xl mb-2 text-gray-800 text-center font-bebas">User Major Distribution</h2>
                <MajorYear userMajor={majors} userYear={years} userID={ids}/>
          </div>
            <div className="bg-white rounded-lg p-4 shadow-md h-64 min-h-[16rem] flex flex-col justify-center">
              <h2 className="font-bold text-xl mb-2 text-gray-800 text-center font-bebas">Most Common Nouns and Verbs</h2>
              <MessageTheme data={organizedDb} />
            </div>
          </div>
            <div className="w-1/2 ml-6">
            <div className="bg-white rounded-lg p-4 shadow-md h-[34rem] min-h-[34rem] min-w-[24rem] flex flex-col">
              <QueryBox data={filteredDb} userInput={userInput} setUserInput={setUserInput} loading={loading} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );}