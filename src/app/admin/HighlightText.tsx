import _ from "lodash";

   // highlight filter matches
   export const getHighlightedText = (text: string, highlight: string) => {
    if (!highlight.trim()){
      return text
    }  
    const regex = new RegExp(`(${_.escapeRegExp(highlight)})`, 'gi')
    const parts = text.split(regex)
    return (
      <span>
         {parts.map((part, i) => 
            part.toLowerCase() == highlight.toLowerCase() ? (
              <mark key = {i} className = "bg-yellow-300 font-bold">{part}</mark>
            ) : ( <span key={i}>{part}</span>)
    )}
    </span>
  )};