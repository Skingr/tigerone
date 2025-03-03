import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';

interface MsgThemeProps {
  data: {
    userQuery: string;
    aiResponse: string;
    userClass: string;
    createdAt: string;
  }[] | undefined;
} 
const MessageTheme = ({data:organizedDb}:MsgThemeProps) => {
  //console.log(organizedDb)
  
    const [sentiments, setSentiments] = useState<{ message: string; score: number; sentiment: string }[]>([]);
    const [donData, setDonData] = useState<{
        labels: string[];  
        datasets: {
          data: number[];  
          backgroundColor: string[];
          borderColor: string[];
          borderWidth: number;
        }[];
      }>({
        labels: [],  
        datasets: [],
      });
        
    
    useEffect(() => {
      if(organizedDb){
        const messageContents:string = organizedDb  // filter out AI response
        .map((entry: { userQuery: string }) => entry.userQuery)
        .join(' ');
         // Load wink-nlp package.
         const winkNLP = require( 'wink-nlp' );
         // Load english language model.
         const model = require( 'wink-eng-lite-web-model' );
         const sentiment = require( 'wink-sentiment' );
        // set sentiment analysis and ner. negation helps accuracy and sbd detects sentences. 
        const nlp = winkNLP( model, [ 'sbd', 'pos', 'negation', 'sentiment', 'ner'] );
        const its = nlp.its
        //const messagesString: string = messageContents.join('')
        const doc = nlp.readDoc(messageContents);
        // gives a score for the sentiment. This would be cool to tie into the time thing!
        const sentimentScore = sentiment(messageContents)
        // above 0 is positive, below 0 is negative
        //console.log("score:", sentimentScore)
        // sort by # of occurence
        const tokens:string[] = doc.tokens().out()
        const partofspeech:string[] = doc.tokens().out(its.pos)
        //console.log("thangs", tokens, partofspeech)
        const wordPos: Record<string, string> = {}
        for (let i = 0; i < tokens.length; i++) {
            wordPos[tokens[i]]=partofspeech[i]
        }
        //console.log("words and pos", wordPos)
            const wordFrequency: Record<string, number> = {};
            
            // iterate thru and add 1
            tokens.forEach((token)=> {
                if(token.length > 3 && (wordPos[token]== "NOUN" || wordPos[token]== "VERB") ){
                    wordFrequency[token] = (wordFrequency[token] ||0) +1
                }
            }
            )
            const sortedTokens = Object.entries(wordFrequency)
            .sort(([, a], [, b]) => b - a) 
            .slice(0, 10) 

            // Gets the top 8 nouns
            //console.log("Top nouns and verbs:", sortedTokens);
            const keyArray = []
            const valArray = []
            for (const [key,val] of sortedTokens){
                keyArray.push(key)
                valArray.push(val)
            }
            const donutData = {
              labels: keyArray,
              datasets: [
                {
                  data: valArray,
                  backgroundColor: [ 
                    'rgba(255, 204, 0, 0.75)', 
                    'rgba(254, 207, 17, 0.75)', 
                    'rgba(255, 210, 25, 0.75)', 
                    'rgba(255, 215, 45, 0.75)', 
                    'rgba(248, 220, 60, 0.75)', 
                    'rgba(255, 225,75, 0.75)', 
                    'rgba(255, 230, 90, 0.75)', 
                    'rgba(255, 235, 105, 0.75)', 
                    'rgba(255, 240, 120, 0.75)', 
                    'rgba(255, 245, 135, 0.75)'
                  ],
                  borderColor: [ 
                    'rgba(255, 204, 0, 0.75)', 
                    'rgba(254, 207, 17, 0.75)', 
                    'rgba(255, 210, 25, 0.75)', 
                    'rgba(255, 215, 45, 0.75)', 
                    'rgba(248, 220, 60, 0.75)', 
                    'rgba(255, 225,75, 0.75)', 
                    'rgba(255, 230, 90, 0.75)', 
                    'rgba(255, 235, 105, 0.75)', 
                    'rgba(255, 240, 120, 0.75)', 
                    'rgb(255, 245, 135, 0.75)'
                  ],
                  borderWidth: 1,
                },
              ],
            };
            setDonData(donutData)

      }    
      }, [organizedDb]);
      const options = {
        plugins: { 
            legend: {
                display: false
            },
            
        },
        scales: {
          y: {
            title: {
              display: true,
              text: 'Frequency',
            },
          },
        },
      };

    return (
        
            <Bar data={donData} options={options} style={{width:"100%", height:"100%"}} />
        
    );
};

export default MessageTheme;

