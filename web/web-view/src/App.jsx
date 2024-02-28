import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/dashboard';
import Access from './pages/access';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Access />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
