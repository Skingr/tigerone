import React, { useEffect, useState } from "react";



const MessageTheme = () => {
    const [db, setDb] = useState<{ 
        messageContent: string; 
        role: string;
    }[]>([]);
    const [ner, setner] = useState('test')
    const [sentiments, setSentiments] = useState<{ message: string; score: number; sentiment: string }[]>([]);

        
    
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
            const nlp = winkNLP( model, [ 'sbd', 'negation', 'sentiment', 'ner'] );
            //const messagesString: string = messageContents.join('')
            const doc = nlp.readDoc(messageContents);
            const sentimentScore = sentiment(messageContents)
            console.log("score:", sentimentScore)
            //const sentimentLabel = sentimentScore > 0 ? "Positive" : sentimentScore < 0 ? "Negative" : "Neutral";
            
            
            const tokens = doc.tokens().out();
            console.log("entities:", tokens);
            //setner(doc.tokens().out())



            
            }
            catch(err: any) {
                console.error(err)
            
          }
        };
      
        fetchData();
      }, []);

    return (
        <div>
            {/* Render your data here */}
            <p>{ner}</p>
            {/* {db.map((entry, index) => (
                <div key={index}>
                    <p>Message: {entry.messageContent}</p>
                    <p>User Class: {entry.userClass}</p>
                </div>
            ))} */}
        </div>
    );
};

export default MessageTheme;

