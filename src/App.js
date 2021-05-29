import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteLayout from './routes';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './App.scss';
function App() {
  
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <RouteLayout />
    </Router>
  );
}

export default App;  