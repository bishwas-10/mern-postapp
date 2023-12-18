import React, { useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import SignIn from "./component/SignIn"
import PrivateRoute from "./component/privateRoute";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Profile from "./component/Profile";

function App() {
  
 
  return (
    <BrowserRouter>
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/auth" element={<SignIn/>}/>
        <Route element={<PrivateRoute/>}>
    <Route path="/profile" element={<Profile/>}/>
        </Route>
        

      </Routes>
      
    
    </div>
    </BrowserRouter>
  );
}

export default App;
