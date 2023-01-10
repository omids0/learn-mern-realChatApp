import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogIn from "./components/LogIn";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/messenger/login" element={<LogIn />} />
          <Route path="/messenger/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
