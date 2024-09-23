import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AddRecord from './AddRecord';
import Update from './Update'; // Import the UpdateRecord component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AddRecord" element={<AddRecord />} />
        <Route path="/update/:id" element={<Update />} /> {/* UpdateRecord route */}
      </Routes>
    </Router>
  );
}

export default App;

