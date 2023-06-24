import './styles/App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Operator from './components/Operator';

function App() {
  return (
    <Router>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/operateur" element={<Operator />} />
          <Route path="/competences" element={<Home />} />
          <Route path="/presence" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/support" element={<Home />} />
          </Routes>
      </Sidebar>
    </Router>
  );
}

export default App;
