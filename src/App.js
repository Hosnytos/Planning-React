import "./styles/App.css";
import MainContainer from "./components/MainContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Operator from "./components/Operator";
import SupportPage from "./components/SupportPage";
import PageNotFound from "./pages/error/PageNotFound";
import { ToastContainer } from "react-toastify";
// import LoginPage from "./pages/auth/LoginPage";

function App() {
  return (
    <>
      <Router>
        <MainContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/operateur" element={<Operator />} />
            <Route path="/competences" element={<Home />} />
            <Route path="/presence" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/support" element={<SupportPage />} />
          </Routes>
        </MainContainer>
        {/* <Routes>
          <Route path="/error" element={<PageNotFound />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes> */}
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;
