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
    
        timestamps.forEach((timestamp) => {
          const date = formatDate(timestamp);
          count[date] = (count[date] || 0) + 1;
        });
    
        const sortedDates = Object.keys(count).sort();
        return {
          labels: sortedDates,
          data: sortedDates.map((date) => count[date]),
    
        };
      };

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
