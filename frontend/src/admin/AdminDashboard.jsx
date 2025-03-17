import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplicationDeatils from "./ApplicationDeatils";
import API from "../apis/Apis"; // Ensure this is set up correctly

const AdminDashboard = () => {

  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await API.get("/admin/applications");
        console.log(response.data.data);
        setApplications(response.data.data);
      } catch (error) {
        console.error("Error fetching applications:", error.response?.data || error.message);
      }
    };

    fetchApplications();
  }, []);

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleLogout = () => {
    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    window.location.href = "/";
  };

  const handleViewDetails = (applicationId) => {
    navigate(`/admin/application/${applicationId}`);
    console.log("Viewing details for Application ID:", applicationId);
  };

  const getStatusStyles = (status) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "bg-green-100 text-green-700 border-green-500";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-500";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-500";
      default:
        return "bg-gray-100 text-gray-700 border-gray-500";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-white p-4 shadow-md">
        <h1 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition">
          Logout
        </button>
      </div>

      {/* Application Table */}
      <div className="p-6">
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border border-gray-300 px-4 py-3">S.No</th>
                <th className="border border-gray-300 px-4 py-3">Application ID</th>
                <th className="border border-gray-300 px-4 py-3">Application Name</th>
                <th className="border border-gray-300 px-4 py-3">Application Date</th>
                <th className="border border-gray-300 px-4 py-3">Application Status</th>
                <th className="border border-gray-300 px-4 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {applications.length > 0 ? (
                applications.map((app, index) => (
                  <tr key={app._id} className="text-center border-b border-gray-200">
                    <td className="border border-gray-300 px-4 py-3">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-3">{app._id}</td>
                    <td className="border border-gray-300 px-4 py-3">{app.name}</td>
                    <td className="border border-gray-300 px-4 py-3">{formatDate(app.createdAt)}</td>
                    <td className="border border-gray-300 px-4 py-3">
                      <span className={`px-3 py-1 rounded-md border ${getStatusStyles(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <button
                        onClick={() => handleViewDetails(app._id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
