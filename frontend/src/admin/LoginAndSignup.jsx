import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import API from "../apis/Apis";

const LoginAndSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const endpoint = isSignup ? "/admin/signup" : "/admin/login";
     try {
       const response = await API.post(endpoint, data);
       console.log("Success:", response.data);
       toast.success(response.data.message)

       if (isSignup) {
         setIsSignup(false); // Switch to login after signup
       } else {
         navigate("/admin/dashboard"); // Redirect to dashboard
       }
     } catch (error) {
       console.error("Error:", error.response?.data || error.message);
       toast.error(error.response?.data?.message || "Something went wrong!");
     }
    console.log(data);
    
    reset();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[450px]">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Admin Sign Up" : "Admin Login"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                {...register("adminname", { required: "Name is required" })}
                className="w-full border p-3 rounded"
              />
              {errors.adminname && <p className="text-red-500 text-sm">{errors.adminname.message}</p>}
            </div>
          )}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("adminemail", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full border p-3 rounded"
            />
            {errors.adminemail && <p className="text-red-500 text-sm">{errors.adminemail.message}</p>}
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("adminpassword", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum 6 characters" },
              })}
              className="w-full border p-3 rounded"
            />
            {errors.adminpassword && <p className="text-red-500 text-sm">{errors.adminpassword.message}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-blue-600 hover:underline"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginAndSignup;
