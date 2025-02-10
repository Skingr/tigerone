import { int } from "drizzle-orm/mysql-core";
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
          label: string;
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
            var sentiment = require( 'wink-sentiment' );

            // set sentiment analysis and ner. negation helps accuracy and sbd detects sentences. 
            const nlp = winkNLP( model, [ 'sbd', 'pos', 'negation', 'sentiment', 'ner'] );
            const its = nlp.its
            //const messagesString: string = messageContents.join('')
            const doc = nlp.readDoc(messageContents);
            // gives a score for the sentiment. This would be cool to tie into the time thing!
            const sentimentScore = sentiment(messageContents)
            // above 0 is positive, below 0 is negative
            console.log("score:", sentimentScore)
            //const sentimentLabel = sentimentScore > 0 ? "Positive" : sentimentScore < 0 ? "Negative" : "Neutral";
            
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
            let keyArray = []
            let valArray = []
            for (const [key,val] of sortedTokens){
                keyArray.push(key)
                valArray.push(val)
            }
            
            const donutData = {
                labels: keyArray,
                datasets: [
                  {
                    label: '# of Queries',
                    data: valArray,
                    backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                    ],
                    borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
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

    return (
        
            <Bar data={donData} style={{width:"100%", height:"100%"}} />
        
    );
};

export default MessageTheme;

