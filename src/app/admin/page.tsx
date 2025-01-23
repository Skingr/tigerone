'use client'; // This is a client-side component

import React, { useState } from 'react';

type Box = {
  title: string;
  content: string;
};

type GraphBox = {
  src: string;
  description: string;
}


export default function AdminDash() {

// TODO: How do I make this mutable? And formatted right? Want an \n after every query
  let queryBox: Box = {title: 'Query box', content: 'Query data... Query data... Query data... Query data... \
    Query data... Query data... Query data... Query data... Query data... Query data... Query data... '}

  let graph1: Box = {title: 'Graph 1', content: 'graph here?'}
  let graph2: Box = {title: 'Graph 2', content: 'graph here?'}
  let graph3: Box = {title: 'Graph 3', content: 'graph here?'}
  let graph4: Box = {title: 'Graph 4', content: 'graph here?'}
  

  return (
    <main className="min-h-screen bg-white p-4 ">
      {/* Header */}
      <header className="mb-6 text-center">
        <h1 className="text-4xl font-bold text-gray-800">Student AI Use Information</h1>
        <p className="text-lg text-gray-600">Subtitle here?</p>
      </header>

      {/* Content */}
      <div className="flex">
        {/* Left Side: Graphs */}

        <div className="flex-1 grid grid-cols-2 gap-4">
            {/*Graph1*/}
            <div
              className="bg-white border rounded p-4 shadow-lg h-60 ml-10 mb-10"
            >
              <h2 className="font-bold text-xl mb-2 text-cc-charcoal">{graph1.title}</h2>
              <p className='text-gray-600'>{graph1.content}</p>
              
            </div>
            {/*Graph2*/}
            <div
              className="bg-white border rounded p-4 shadow-lg h-60 ml-10 "
            >
              <h2 className="font-bold text-xl mb-2 text-cc-charcoal">{graph2.title}</h2>
              <p className='text-gray-600'>{graph2.content}</p>

              </div>
              {/*Graph3*/}
            <div
              className="bg-white border rounded p-4 shadow-lg h-60 ml-10"
            >
              <h2 className="font-bold text-xl mb-2 text-cc-charcoal">{graph3.title}</h2>
              <p className='text-gray-600'>{graph3.content}</p>
              
            </div>
            {/*Graph4*/}
            <div
              className="bg-white border rounded p-4 shadow-lg h-60 ml-10 "
            >
              <h2 className="font-bold text-xl mb-2 text-cc-charcoal">{graph4.title}</h2>
              <p className='text-gray-600'>{graph4.content}</p>
              
            </div>
            
           
          
        </div>

        {/* Right Side: Data Box */}
        <div className="w-1/2 ml-4 mr-10 ml-10 ">
          <div className="bg-white border rounded p-4 shadow-lg min-h-full">
            <h2 className="font-bold text-xl mb-2 text-cc-charcoal">{queryBox.title}</h2>
            <p className='text-gray-600'>{queryBox.content}</p>
          </div>
        </div>
      </div>
    </main>
  );
}