import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import imgBg from "../assets/loginBg.jpg"
import axios from "axios";
const URL = import.meta.env.VITE_APP_BACKEND_URL;

const Login = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error("Fill all the fields");
    }
    try {
      const res = await axios.post(
        `${URL}/api/${selectedRole}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      navigate("/dashboard");
      navigate(0)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${imgBg})` }}>
      <div className="relative z-10 bg-white p-8 rounded-lg shadow-[0_10px_20px_rgba(0,0,0,0.2)] max-w-md w-full backdrop-blur-sm bg-white/90">
        <h1 className="text-2xl font-semibold text-center text-[#457b9d] mb-6">
          Login
        </h1>
        <div className="mb-4">
          <label className="block text-[#457b9d] font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-[#457b9d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#457b9d]"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label className="block text-[#457b9d] font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-[#457b9d] rounded-md focus:outline-none focus:ring-2 focus:ring-[#457b9d]"
            placeholder="Enter your password"
          />
        </div>
        <div className="mb-6">
          <label className="block text-[#457b9d] font-medium mb-2">
            Select Role
          </label>
          <div className="flex justify-between">
            <label className="text-[#457b9d]">
              <input
                type="radio"
                name="role"
                value="admin"
                onChange={(e) => setSelectedRole(e.target.value)}
                className="mr-2"
              />
              Admin
            </label>
            <label className="text-[#457b9d]">
              <input
                type="radio"
                name="role"
                value="teacher"
                onChange={(e) => setSelectedRole(e.target.value)}
                className="mr-2"
              />
              Teacher
            </label>
            <label className="text-[#457b9d]">
              <input
                type="radio"
                name="role"
                value="student"
                onChange={(e) => setSelectedRole(e.target.value)}
                className="mr-2"
              />
              Student
            </label>
          </div>
        </div>
        <button
          onClick={handleLogin}
          disabled={!selectedRole || !email || !password}
          className="w-full py-2 px-4 bg-[#457b9d] text-white rounded-md hover:bg-[#2c526d] transition-colors disabled:opacity-50"
        >
          Login
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;