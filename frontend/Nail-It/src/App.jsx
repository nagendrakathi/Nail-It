import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Home/Dashboard";
import NailIt from "./pages/NailIt/NailIt";
import { UserContext } from "./context/userContext";
import { useContext } from "react";
import Profile from "./pages/Auth/Profile";

const App = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <Router>
        <Routes>
          {/*Default Routes*/}
          <Route
            path="/"
            element={!user ? <LandingPage /> : <Navigate to="/dashboard" />}
          />

          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/dashboard/profile"
            element={user ? <Profile /> : <Navigate to="/" />}
          />
          <Route
            path="/nail-it/:sessionId"
            element={user ? <NailIt /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </div>
  );
};

export default App;
