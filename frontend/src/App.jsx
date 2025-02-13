import React, { useState } from 'react';
import axios from 'axios';
import { marked } from 'marked';
import './App.css'; // Import the CSS file

const App = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [isloading,setLoading] = useState(false);

  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?";
  const apiKey = "key=AIzaSyCJWVYINPtVUxAbZWtl5f21SlJ9fG6jU_w";

  const handleSubmit = async () => {
    try {
      console.log(query);
      console.log("Submit");
      setLoading(true);
      const data = await axios.post(`${url}${apiKey}`,{
        "contents": [{
          "parts":[{"text": `${query}`}]
          }]
         });
      console.log("ANSWER", data);
      const formattedResponse = marked(data.data.candidates[0].content.parts[0].text);
      setResponse(formattedResponse);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>AI Assistant</h1>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
      <button onClick={handleSubmit}>
        Generate
      </button>
      {
        isloading ? <p>Loading...</p> :<div dangerouslySetInnerHTML={{ __html: response }} />
      }

    </div>
  );
};

export default App;
