import React, { FC } from 'react'; //props
import ReactMarkdown from 'react-markdown'; //markdown -> react element
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'; // add color schemes, code is more readable
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // dark backround , colorful text
import vscDarkPlus from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import remarkMath from 'remark-math';

type MarkdownWithSyntaxHighlighterProps = {
  content: string; //piece of txt
}

//children attr is where markdown godes
//react mkdn takes plugin that lets you format
//create funccomponent
const MarkdownWithSyntaxHighlighter: FC<MarkdownWithSyntaxHighlighterProps> = ({ content }) => {
  return (
    <ReactMarkdown 
      // Markdown text (content) --> react elemeents to render on react page
      // children={content} // render markdown on content string 

      remarkPlugins={[remarkGfm, [remarkMath, { singleDollarTextMath: true }]]}
      rehypePlugins={[[rehypeKatex, { strict: false, output: 'html', throwOnError: false }]]}

      components={{ // prop components -- access code component and inject custom logic into 
        code({ node, inline, className, children, ...props }:any) { // inside react mkdn componenet accessing code component which has node, inline,CN, children
            //injecting custom logic--match with langauge
          // react-markdown uses className like "language-ts" or "language-js"   
          const match = /language-(\w+)/.exec(className || ''); // regeex see if codeblock has language specified
          const isCodeBlock = !inline && match;
          
          const isMathBlock = !inline && /^\$\$[\s\S]*\$\$/.test(String(children));
          if (isMathBlock) {
            return <div className="math-block">{children}</div>;
          }
          
          return isCodeBlock ? ( // if its not inline (codeblock) and its a match (IE className == LanguageThatExists) then  inject syntax highjlighter component
            <SyntaxHighlighter
              language={match[1]} // sets langug
              style={vscDarkPlus} // dark theme
               PreTag="div" // more custonmizable tag--we need smaller fonts nad copy button 
              {...props} // spread 
              //regex looks for newline at the end of string, .replace removes it 
            >
              {String(children).replace(/\n$/, '')} 
            </SyntaxHighlighter>
          ) : (   //if : else-if its inline (display code normally without colors) <code>
            <code className={className} {...props}> 
              {children}
            </code>
            //default react markdown component
          );
        },
      }}
    >
      {content}</ReactMarkdown>
  );
};

export default MarkdownWithSyntaxHighlighter; //av for other files to use