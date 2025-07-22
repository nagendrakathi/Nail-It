import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Toaster} from "react-hot-toast";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Home/Dashboard";
import NailIt from "./pages/NailIt/NailIt";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          {/*Default Routes*/}
          <Route path="/" element={<LandingPage/>}/>
   
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/nail-it/:sessionId" element={<NailIt/>}/>
        </Routes>
      </Router>
      <Toaster
      toastOptions={{
        className:"",
        style:{
          fontSize:"13px"
        },
      }}
      />
    </div>
  )
}

export default App