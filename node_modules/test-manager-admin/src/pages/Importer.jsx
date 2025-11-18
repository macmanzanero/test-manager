import React, { useState } from 'react';
import axios from 'axios';

export default function Importer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!file) return;
    const fd = new FormData();
    fd.append('file', file);
    const res = await axios.post('http://localhost:4000/api/tests/import', fd);
    setResult(res.data);
  };
  return (
    <div>
      <h3>Importar test desde fichero</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".txt" onChange={e=>setFile(e.target.files[0])} />
        <button>Importar</button>
      </form>
      <pre>{result && JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}
