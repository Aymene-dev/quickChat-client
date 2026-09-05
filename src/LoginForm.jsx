import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        },
      );

      login(response.data.accessToken);
      const refreshToken = response.data.refreshToken;
      localStorage.setItem("refreshToken", refreshToken);
      navigate("/conversations");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-screen bg-blue-950 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center bg-white h-1/2 min-h-100 w-4/10 rounded-3xl flex-col shadow-2xl"
      >
        <h1 className="mb-9 text-3xl font-bold ">Connect to your account</h1>
        <label className="w-4/5 mb-7">
          Email:
          <input
            type="text"
            name="email-input"
            className="block bg-gray-200 px-3 py-2 rounded-4xl mt-3 w-full focus:outline-none"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <label className="w-4/5">
          Password:
          <input
            type="password"
            name="password-input"
            className="block bg-gray-200 px-3 py-2 rounded-4xl mt-3 w-full focus:outline-none"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <button
          type="submit"
          className="mt-8 bg-green-400 text-white px-4 py-2 rounded-3xl cursor-pointer"
        >
          Sign in
        </button>
        <p className="mt-2">
          Don't have an account yet?{" "}
          <a
            className="text-blue-500 underline cursor-pointer"
            onClick={() => navigate("/create-account")}
          >
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginForm;
