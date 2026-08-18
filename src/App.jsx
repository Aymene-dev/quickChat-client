import { useState } from "react";
import LoginForm from "./LoginForm.jsx";
import SignUpForm from "./SignUpForm.jsx";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import MainPage from "./MainPage.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/create-account" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/conversations" element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
