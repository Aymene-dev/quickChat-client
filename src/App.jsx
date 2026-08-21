import { useState } from "react";
import LoginForm from "./LoginForm.jsx";
import SignUpForm from "./SignUpForm.jsx";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./MainPage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/create-account" element={<SignUpForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/conversations"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/conversations" />} />
      </Routes>
    </>
  );
}

export default App;
