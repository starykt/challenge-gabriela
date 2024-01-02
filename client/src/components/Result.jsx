import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const List = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchAllResults = async () => {
      try {
        const res = await axios.get("http://localhost:8080/results");
        setResults(res.data);
      } catch(err) {
        console.log(err);
      }
    }
    fetchAllResults();
  }, [])

  return (
  <div>
    <div>
      {results.map(result => (
        <div key={result.id}>
          <h1>
            {result.bimester}
          </h1>
          <h2>
            {result.lesson}
          </h2>
          <h3>
            {result.grade}
          </h3>
        </div>
      ))}
      <buttton><Link to="/add">Add new grade</Link></buttton>
    </div>
  </div>
  )
};

export default List;