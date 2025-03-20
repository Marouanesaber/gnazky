
import React, { useEffect, useState } from "react";

const AppointmentStats = () => {
  const [stats, setStats] = useState({
    count: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // First check if the backend is accessible
        const testResponse = await fetch('http://localhost:5000/api/test');
        if (!testResponse.ok) throw new Error('Backend connection failed');
        
        // You could add more specific API calls here once your backend routes are fully implemented
        setStats({
          count: Math.floor(Math.random() * 50) + 20, // Placeholder random data
          loading: false,
          error: null
        });
      } catch (error) {
        console.error('Error fetching appointment stats:', error);
        setStats({
          count: 0,
          loading: false,
          error: "Failed to connect to backend. Make sure the server is running on port 5000."
        });
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Today's Appointments</h3>
      {stats.loading ? (
        <div className="animate-pulse">Loading stats...</div>
      ) : stats.error ? (
        <div className="text-red-500 text-sm">{stats.error}</div>
      ) : (
        <div className="text-3xl font-bold text-blue-600">{stats.count}</div>
      )}
      <p className="text-sm text-gray-500 mt-2">
        {stats.error 
          ? "Make sure to start the backend server with 'node backend/server.js'" 
          : "Appointments scheduled for today"}
      </p>
    </div>
  );
};

export default AppointmentStats;
