import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img3 from "../assets/img3.png";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/getinfo`,
          { withCredentials: true }
        );
        if (response && typeof response.data === "object") {
          setData(response.data);
          console.log(response.data);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        setError("Failed to fetch data. Please try again later.");
        console.error("Data could not be fetched:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading data...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  const studentLength = data?.studentLendth ?? 'N/A';
  const teacherLength = data?.teacherLendth ?? 'N/A';
  const classroomLength = data?.classroomLendth ?? 'N/A';

  const cardData = [
    { title: "Number of Students", value: studentLength, image: img1 },
    { title: "Number of Teachers", value: teacherLength, image: img2 },
    { title: "Number of Classrooms", value: classroomLength, image: img3 },
  ];

  const chartData = {
    labels: ['Students', 'Teachers', 'Classrooms'],
    datasets: [
      {
        label: 'Count',
        data: [studentLength, teacherLength, classroomLength],
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)'],
        borderColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(75, 192, 192)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'School Statistics',
        font: {
          size: 20
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div className="p-4 space-y-8">
      <h1 className="text-6xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cardData.map((item, index) => (
          <div key={index} className="bg-teal-500 rounded-lg shadow-xl hover:bg-sky-700 transition-colors duration-300 p-6">
            <div className="flex flex-col items-center mb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 mb-4"
              />
              <h2 className="text-3xl font-semibold text-white text-center">{item.title}</h2>
            </div>
            <p className="text-6xl font-bold text-white text-center">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-xl p-6 mt-8">
        <div style={{ height: '400px' }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;