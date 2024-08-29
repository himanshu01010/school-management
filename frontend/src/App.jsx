import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import Table from "./components/Table";
import StudentTable from "./components/StudentTable";
import Layout from "./components/Layout";
import RegisterClassroom from "./components/RegisterClassroom";
import ClassroomTable from "./components/ClassroomTable";
import axios from "axios";

export const URL = import.meta.env.VITE_APP_BACKEND_URL;

function App() {
  const [isauth, setAuth] = useState(false);
  const [authType, setAuthType] = useState("");

  useEffect(() => {
    axios.get(`${URL}/api/auth/`, { withCredentials: true })
      .then(res => {
        const type = res.data.type;
        setAuthType(type);
        localStorage.setItem('authType', type);
        localStorage.setItem('isAuth', true);
        setAuth(true);
      })
      .catch(() => {
        setAuthType("");
        localStorage.removeItem('authType');
        localStorage.setItem('isAuth', false);
        setAuth(false);
      });
  }, []);

  const isAuth = localStorage.getItem("isAuth") === 'true';

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={isAuth ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/logout" element={<Login />} />
        <Route element={isAuth ? <Layout authType={authType} /> : <Navigate to="/" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/register"element={<RegisterForm authType={authType} />} />
          <Route path="/dashboard/teachers" element={<Table authType={authType} />} />
          <Route path="/dashboard/students" element={<StudentTable authType={authType} />} />
          <Route path="/dashboard/classrooms" element={<ClassroomTable authType={authType} />} />
          <Route path="/dashboard/add/classroom" element={<RegisterClassroom authType={authType} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
