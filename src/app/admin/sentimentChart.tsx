import { time } from "console";
import { forEach } from "lodash";
import React, {useEffect,useState} from "react";
import { Line} from"react-chartjs-2";


interface SentChartProps {
  data: {
    userQuery: string;
    aiResponse: string;
    userClass: string;
    createdAt: string;
  }[] | undefined;
} 

const SentimentChart = ({data:organizedDb}:SentChartProps) => {
    const [sentiments, setSentiments] = useState<{ message: string; score: number; sentiment: string }[]>([]);
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
      console.log(organizedDb)
      if(organizedDb){
        const sentiment = require( 'wink-sentiment' );
        const timeToSentScore: { [key: string]: number } = {};
        organizedDb.forEach((entry: { userQuery: string; aiResponse: string; userClass: string; createdAt: string }) => {
          const result = sentiment(entry.userQuery);
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
          datasets: [{
            label: '',
            data,
            tension: 0.05,
            borderwidth: 3,
            borderColor: 'rgba(85, 0, 170)',
            backgroundColor: 'rgba(85, 0, 170, 0.5)', 
            
          },
          ],
        });
      }  
    },[organizedDb]);

    // takes in the messages and their times, returns the 
    const groupedData = (timeToScore: { [key: string]: number }) => {
        const timeToAvgScore: {[key: string]: number} = {};
        const timeToTotalScore: {[key: string]: number} = {}; // this has the times of the messages

        const timeToTotalResponses: {[key: string]: number} = {}; // this has the times of the messages
        const timeWindowInt = [86_400_000]; // multiplier to have 12 hours be the interval, can change // number of millisecs in an hour
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
        const day = new Date(date)
        const day_split = day.toDateString().split(' ')
    
        return `${day_split[0]}, ${day_split[1]} ${day_split[2]}` //Old: ${mm}/${dd}/${yy.slice(-2)} at 
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
