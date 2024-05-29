import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Routes} from 'react-router-dom';
import Form from './components/Form.jsx';
import "./index.css";




function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Form />}/>
      </Routes>
    </Router>
  );
}

export default App;