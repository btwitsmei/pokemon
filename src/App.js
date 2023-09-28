import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import List from './components/list/List';
import Detail from './components/detail/Detail';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<List />} />
          <Route path="/pokemon/:name" element={<Detail />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;