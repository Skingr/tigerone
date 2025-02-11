import React, { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2';





const MessageTheme = () => {
    const [db, setDb] = useState<{ 
        messageContent: string; 
        role: string;
    }[]>([]);
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
        const fetchData = async () => {
          try {
            const response = await fetch('/api/admin', { method: 'GET' });
            if (!response.ok) throw new Error('Failed to fetch data');
            const data = await response.json();
            setDb(data);
      
            const messageContents:string = data  // filter out AI response
              .filter((entry: { role: string }) => entry.role === 'user')
              .map((entry: { messageContent: string }) => entry.messageContent)
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
            console.log("score:", sentimentScore)
            
            // sort by # of occurence
            const tokens:string[] = doc.tokens().out()
            const partofspeech:string[] = doc.tokens().out(its.pos)
            //console.log("thangs", tokens, partofspeech)
            const wordPos: Record<string, string> = {}
            for (let i = 0; i < tokens.length; i++) {
                wordPos[tokens[i]]=partofspeech[i]
            }

            console.log("words and pos", wordPos)
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
            console.log("Top nouns and verbs:", sortedTokens);
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
                    backgroundColor: [ 'rgba(0, 0, 255, 0.3)', 
                      'rgba(28, 0, 227, 0.3)', 
                      'rgba(56, 0, 199, 0.3)', 
                      'rgba(85, 0, 170, 0.3)', 
                      'rgba(113, 0, 142, 0.3)', 
                      'rgba(142, 0, 113, 0.3)', 
                      'rgba(170, 0, 85, 0.3)', 
                      'rgba(199, 0, 56, 0.3)', 
                      'rgba(227, 0, 28, 0.3)', 
                      'rgba(255, 0, 0, 0.3)'
                    ],
                    borderColor: [ 'rgba(0, 0, 255, 1)', 
                      'rgba(28, 0, 227, 1)', 
                      'rgba(56, 0, 199, 1)', 
                      'rgba(85, 0, 170, 1)', 
                      'rgba(113, 0, 142, 1)', 
                      'rgba(142, 0, 113, 1)', 
                      'rgba(170, 0, 85, 1)', 
                      'rgba(199, 0, 56, 1)', 
                      'rgba(227, 0, 28, 1)', 
                      'rgba(255, 0, 0, 1)'
                    ],
                    borderWidth: 1,
                  },
                ],
              };
            
            setDonData(donutData)



            
            }
            catch(err: any) {
                console.error(err)
            
          }
        };
      
        fetchData();
        

      }, []);
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

