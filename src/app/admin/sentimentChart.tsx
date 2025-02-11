import { time } from "console";
import { forEach } from "lodash";
import React, {useEffect,useState} from "react";
import { Line} from"react-chartjs-2";


const SentimentChart = () => {
    const [sentiments, setSentiments] = useState<{ message: string; score: number; sentiment: string }[]>([]);
    const [db, setdb] = useState<{ 
          role: string;
          messageContent: string; 
          userClass: string;
          createdAt: string 
        }[]>();
        
    const [linData, setLinData] = useState({
        labels: [] as string[],
        datasets: [
          {
            label: 'count',
            data: [] as number[],
            tension: 0,
            borderwidth: 2,
            borderColor: 'rgba(85, 0, 170)',
            backgroundColor: 'rgba(85, 0, 170, 0.5)', 
        },
        
        ],
    
    });


    useEffect(() =>{
        const fetchData = async() => {
            try {
                const response = await fetch('/api/admin', {
                  method: 'GET',
                })
                if (!response.ok){
                  throw new Error ('Failed');
                }
                const db = await response.json();
                setdb(db);
                
                var sentiment = require( 'wink-sentiment' );
                const timeToSentScore: { [key: string]: number } = {};
                
                // filter out AI response
                const dbdata = db  
                .filter((entry: { role: string }) => entry.role === 'user')

                dbdata.forEach((entry: { role: string; messageContent: string; userClass: string; createdAt: string }) => {
                    const result = sentiment(entry.messageContent);
                    timeToSentScore[entry.createdAt] = result.normalizedScore;
                  });
                
                
            
                const {labels, data} = groupedData(timeToSentScore);
                console.log("LABELS: ", labels)
                console.log("DATA:", data)
                //console.log(typeof db)
                //console.log(db) 
                //console.log(db[0].userquery)
                
                setLinData({
                    labels,
                    datasets: [
                    {
                        label: '',
                        data,
                        tension: 0.05,
                        borderwidth: 3,
                        borderColor: 'rgba(85, 0, 170)',
                         backgroundColor: 'rgba(85, 0, 170, 0.5)', 
            
                    },
                    ],
                });


            
              }catch(err: any) {
                console.error(err)
              }
            }
            
              fetchData(); // gathers data from database when page is loaded, so will update on each refresh
    },[]);

    // takes in the messages and their times, returns the 
    const groupedData = (timeToScore: { [key: string]: number }) => {
        const timeToAvgScore: {[key: string]: number} = {};
        const timeToTotalScore: {[key: string]: number} = {}; // this has the times of the messages

        const timeToTotalResponses: {[key: string]: number} = {}; // this has the times of the messages
        const timeWindowInt = [3600000]; // multiplier to have 12 hours be the interval, can change // number of millisecs in an hour
        const currentTime = new Date();
        const timeWindow = new Date(currentTime.getTime() - 12 * timeWindowInt[0])
        
        const timestamps:string[] = Object.keys(timeToScore)

        timestamps.forEach((timestamp) => {
          const date = new Date(timestamp);
          if (date >= timeWindow && date <= currentTime){
            const formattedHour = formatDate(timestamp);
            timeToTotalScore[formattedHour] = (timeToTotalScore[formattedHour] || 0) + timeToScore[timestamp];
            timeToTotalResponses[formattedHour] = (timeToTotalResponses[formattedHour] || 0) + 1
          }
    
        });
        
        const times:string[] = Object.keys(timeToTotalScore)

        times.forEach((formattedTime) => {
            timeToAvgScore[formattedTime]=timeToTotalScore[formattedTime]/timeToTotalResponses[formattedTime]
        });


    
        const labels: string[] = [];
        for (let i = 11; i>= 0; i--){
            const hourLabel = new Date(currentTime.getTime() - i * timeWindowInt[0]);
            const formattedHour = formatDate(hourLabel.toISOString());

            labels.push(formattedHour);
        }

        return {
          labels,
          data: labels.map((label) => timeToAvgScore[label] || 0),
    
        };
      };

      function formatDate(date: string){
        const hour = new Date(date).getHours();
        const amPm = hour >= 12 ? "PM" : "AM";
        const formatHour = ((hour %12)||12);

    
        return `${formatHour} ${amPm}` //Old: ${mm}/${dd}/${yy.slice(-2)} at 
      }

   

      const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
    
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
      };

      return<Line data={linData} options = {options}></Line>
}

export default SentimentChart;
