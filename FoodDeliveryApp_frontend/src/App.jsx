import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePageLogin from "./pages/HomePageLogin.jsx";
import './styles.css'; 

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePageLogin />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

