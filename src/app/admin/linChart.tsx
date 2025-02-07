import React, {useEffect,useState} from "react";
import { ArcElement, BarElement, CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Tooltip} from "chart.js";
import { Line} from"react-chartjs-2";


Chart.register(CategoryScale);
Chart.register(BarElement);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
const LinChart = () => {
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
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
              setdb(db)
        
              const timestamps = db.map((entry: { createdAt: string}) => entry.createdAt);
        
              const {labels, data} = groupedData(timestamps);
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
                    borderColor: 'rgb(53, 162, 235)',
                    backgroundColor: 'rgba(53, 162, 235, 0.5)',
          
                  },
                ],
              });
            
              }catch(err: any) {
                console.error(err)
              }
            }
            
              fetchData(); // gathers data from database when page is loaded, so will update on each refresh
    },[]);

    const groupedData = (timestamps: string[]) => {
        const count: {[key: string]: number} = {};
        const timeWindowInt = [3600000]; // multiplier to have 12 hours be the interval, can change
        const currentTime = new Date();
        const timeWindow = new Date(currentTime.getTime() - 12 * timeWindowInt[0])
    
        timestamps.forEach((timestamp) => {
          const date = new Date(timestamp);
          if (date >= timeWindow && date <= currentTime){
            const formattedHour = formatDate(timestamp);
            count[formattedHour] = (count[formattedHour] ||0) +1;
          }
    
        });
    
        const labels: string[] = [];
        for (let i = 11; i>= 0; i--){
            const hourLabel = new Date(currentTime.getTime() - i * timeWindowInt[0]);
            const formattedHour = formatDate(hourLabel.toISOString());

            labels.push(formattedHour);
        }

        return {
          labels,
          data: labels.map((label) => count[label]/2 || 0),
    
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

export default LinChart;
