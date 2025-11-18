import React from 'react';
import Dashboard from './pages/Dashboard';

export default function App() {
  return (
    <div className="admin-shell">
      <header><h1>Test Manager (Admin)</h1></header>
      <main><Dashboard /></main>
    </div>
  );
}
