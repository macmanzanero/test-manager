import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Importer from './Importer';

export default function Dashboard() {
  const [tests, setTests] = useState([]);
  useEffect(()=> {
    axios.get('http://localhost:4000/api/tests')
      .then(r => setTests(r.data.tests || []));
  }, []);
  return (
    <div>
      <Importer />
      <h2>Tests disponibles</h2>
      <ul>
        {tests.map(t => <li key={t}>{t}</li>)}
      </ul>
    </div>
  );
}
