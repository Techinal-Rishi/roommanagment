import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import RoomState from './context/rooms/RoomState';
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { useState } from "react";
import "./App.css";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });

    setTimeout(() => {
      setAlert(null);
    }, 2500);
  };

  return (
    <>
      <RoomState>
        <Router>
          <div className="app-wrapper">
            <Navbar />
            <Alert alert={alert} />
            <main className="main-content">
              <div className="container">
                <Routes>
                  <Route path="/" element={<Home showAlert={showAlert} />} />
                  <Route path="/about" element={<About showAlert={showAlert} />} />
                  <Route path="/login" element={<Login showAlert={showAlert} />} />
                  <Route path="/signup" element={<Signup showAlert={showAlert} />} />
                </Routes>
              </div>
            </main>
            <footer className="modern-footer">
              <div className="container d-flex flex-wrap justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                  <i className="fa-solid fa-house-chimney text-primary"></i>
                  <span className="fw-semibold text-dark">RoomEase</span>
                  <span className="text-muted ms-2">— Seamless Room Management</span>
                </div>
                <div className="text-muted mt-2 mt-sm-0">
                  Built with React & Express &copy; {new Date().getFullYear()}
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </RoomState>
    </>
  );
}

export default App;
