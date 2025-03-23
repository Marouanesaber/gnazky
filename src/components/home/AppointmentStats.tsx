
import React, { useEffect, useState } from "react";
import { apiRequest } from "@/utils/api";
import { Calendar } from "lucide-react";

const AppointmentStats = () => {
  const [stats, setStats] = useState({
    count: 0,
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Use the dedicated stats endpoint instead of filtering appointments client-side
        const response = await apiRequest('/appointments/stats');
        
        setStats({
          count: response.todayCount || 0,
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
      <div className="flex items-center gap-3 mb-2">
        <div className="rounded-full p-2 bg-clinic-blue/10">
          <Calendar className="h-5 w-5 text-clinic-blue" />
        </div>
        <h3 className="text-lg font-semibold">Today's Appointments</h3>
      </div>
      
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
