import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Convert from "./Pages/Convert";
import Home from "./Pages/Home";
import LearnSign from "./Pages/LearnSign";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./Pages/Profile";
function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route exact path="/silent-bridge/home" element={<Home />} />
            <Route exact path="/silent-bridge/convert" element={<Convert />} />
            <Route
              exact
              path="/silent-bridge/learn-sign"
              element={<LearnSign />}
            />
            <Route exact path="/silent-bridge/login" element={<Login />} />
            <Route
              exact
              path="/silent-bridge/register"
              element={<Register />}
            />
            <Route exact path="/silent-bridge/profile" element={<Profile />} />
            <Route exact path="*" element={<Home />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
