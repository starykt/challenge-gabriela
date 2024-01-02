import { Link } from "react-router-dom";
import { IResult } from "../interfaces/result";
import React, { useState, useEffect } from 'react';
import { ResultService } from "../services/resultService";

const resultService = new ResultService();

const List: React.FC = () => {
  const [results, setResults] = useState<IResult[]>([]);

  useEffect(() => {
    const fetchAllResults = async () => {
      try {
        const fetchedResults = await resultService.fetchAllResults();
        setResults(fetchedResults);
      } catch(err) {
        console.error(err);
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
      <button><Link to="/new">Add new grade</Link></button>
    </div>
  </div>
  )
};

export default List;