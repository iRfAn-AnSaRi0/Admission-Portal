import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../apis/Apis";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const response = await API.get(`/admin/application/${id}`);
        console.log(response.data.data);
        setApplication(response.data.data);
      } catch (error) {
        console.error("Error fetching application details:", error.message);
      }
    };

    fetchApplicationDetails();
  }, [id]);

  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Handle Accept Action (Without Popup)
  const handleAccept = async () => {
    try {
      const response = await API.put(`/admin/${id}/application`, {
        status: "Accepted",
        remark: "Accepted",
      });
      console.log(response.data);
      toast.success("Accepted")
      setApplication((prev) => ({ ...prev, status: "Accepted", remark: "Accepted" }));
    } catch (error) {
      toast.error("Error updating application status:", error.message);
    }
  };

  // Handle Reject Action (Opens Popup for Remark)
  const openRejectPopup = () => {
    setIsModalOpen(true);
  };

  const handleReject = async (data) => {
    try {
      const response = await API.put(`/admin/${id}/application`, {
        status: "Rejected",
        remark: data.remark,
      });
      console.log(response.data);
      toast.success("Rejected")
      setApplication((prev) => ({ ...prev, status: "Rejected", remark: data.remark }));
      setIsModalOpen(false);
      reset();
    } catch (error) {
      toast.error("Error updating application status:", error.message);
    }
  };

  if (!application) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-white p-4 shadow-md">
        <div className="flex items-center">
          <button onClick={() => navigate(-1)} className="mr-3">
            <ArrowLeft size={24} className="text-gray-700 hover:text-black transition" />
          </button>
          <h1 className="text-xl font-semibold">Application Details</h1>
        </div>
        <button
          onClick={() => (window.location.href = "/")}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Details Section */}
      <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Applicant Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <p><strong>Name:</strong> {application.name}</p>
          <p><strong>Email:</strong> {application.email}</p>
          <p><strong>Phone:</strong> {application.phone}</p>
          <p><strong>DOB:</strong> {formatDate(application.DOB)}</p>
          <p><strong>Gender:</strong> {application.gender}</p>
          <p><strong>Address:</strong> {application.address}, {application.city}, {application.state}</p>
          <p><strong>Course Applied:</strong> {application.course}</p>
          <p><strong>Application Date:</strong> {formatDate(application.createdAt)}</p>
          <p><strong>Updated At:</strong> {formatDate(application.updatedAt)}</p>
          <p><strong>Remark:</strong> {application.remark || "N/A"}</p>
          <p>
            <strong>Status:</strong>
            <span
              className={`px-3 py-1 rounded ml-2 ${
                application.status === "Accepted"
                  ? "bg-green-100 text-green-700"
                  : application.status === "Rejected"
                  ? "bg-red-100 text-red-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {application.status}
            </span>
          </p>
        </div>

        {/* Display Image */}
        <div className="mt-6 flex items-center">
          <strong className="block mb-2 text-lg">Result Image:</strong>
          {application.result ? (
            <img
              src={application.result}
              alt="Result"
              className="w-40 h-40 object-cover rounded-lg mr-6"
            />
          ) : (
            <p className="text-gray-500">No Image Available</p>
          )}
        </div>

        {/* Accept & Reject Buttons */}
        <div className="mt-6 flex space-x-4">
          {/* Accept Button (Direct API Call) */}
          <button
            onClick={handleAccept}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={application.status === "Accepted" || application.status === "Rejected"}
          >
            Accept
          </button>

          {/* Reject Button (Opens Modal) */}
          <button
            onClick={openRejectPopup}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={application.status === "Accepted" || application.status === "Rejected"}
          >
            Reject
          </button>
        </div>
      </div>

      {/* Modal for Reject */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Reject Application</h2>
            <form onSubmit={handleSubmit(handleReject)}>
              <label className="block mb-2 font-medium">Remark:</label>
              <textarea
                {...register("remark", { required: "Remark is required" })}
                className="w-full p-2 border rounded-md mb-4"
                placeholder="Enter remarks..."
              ></textarea>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetails;
