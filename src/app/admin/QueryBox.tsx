import React, { useState } from 'react';
import AdminSearch from './AdminSearch';
import { JSX } from 'react/jsx-runtime';
import { getHighlightedText } from './HighlightText';

interface QueryBoxProps {
  data: {
    userQuery: string;
    aiResponse: string;
    userClass: string;
    createdAt: string;
    convoID: string;
  }[] | undefined;
  userInput: string;
  setUserInput: (input: string) => void;
  loading: boolean;
}

const QueryBox: React.FC<QueryBoxProps> = ({ data, userInput, setUserInput, loading }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null); 

   const handleQueryClick = (query: {
    userQuery: string;
    aiResponse: string;
    createdAt: string;
    convoID: string;
  }) => {
    console.log('Query clicked:', query.convoID);
  };

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleString();
  };

  return (
    <div className="query-box">
      <h2 className="font-bold text-xl mb-2 text-gray-800">Query Box</h2>
      
      <div className="mb-4">
        <AdminSearch
          userInput={userInput}
          setUserInput={setUserInput}
          loading={loading}
        />
      </div>

      {data && data.length > 0 ? (
        <div className="overflow-y-auto max-h-96 border rounded-lg p-3">
          {data.map((msg, index) => (
            <div
              key={index}
              className={`border-b py-1 transition-colors duration-200 ${
                hoveredIndex === index ? 'bg-gray-100' : 'bg-white'
              }`}
              onMouseEnter={() => setHoveredIndex(index)} 
              onMouseLeave={() => setHoveredIndex(null)} 
              onClick={() => handleQueryClick(msg)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <b>Student Query:</b>
                  <span style={{ marginLeft: '8px' }}>
                    {expandedIndex === index ? (
                      getHighlightedText(msg.userQuery, userInput)
                    ) : (
                      getHighlightedText(truncateText(msg.userQuery, 100), userInput)
                    )}
                  </span>
                  {msg.userQuery.length > 100 && (
                    <button
                      onClick={() => toggleExpand(index)}
                      className="text-yellow-500 ml-2"
                    >
                      {expandedIndex === index ? 'See less' : 'See more'}
                    </button>
                  )}
                  <br />

                  <b>AI Response:</b>
                  <span style={{ marginLeft: '8px' }}>
                    {expandedIndex === index ? (
                      getHighlightedText(msg.aiResponse, userInput)
                    ) : (
                      getHighlightedText(truncateText(msg.aiResponse, 100), userInput)
                    )}
                  </span>
                  {msg.aiResponse.length > 100 && (
                    <button
                      onClick={() => toggleExpand(index)}
                      className="text-yellow-500 ml-2"
                    >
                      {expandedIndex === index ? 'See less' : 'See more'}
                    </button>
                  )}
                  <br />

                  <b>Timestamp:</b> {formatDate(msg.createdAt)}
                  <br />
                </div>

                {hoveredIndex === index && (
                  <div className="text-sm text-gray-500 italic">
                    View Full Conversation
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>{data ? "No results found." : "Loading..."}</p>
      )}
    </div>
  );
};

export default QueryBox;