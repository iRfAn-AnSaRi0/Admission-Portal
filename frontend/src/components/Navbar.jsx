import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Menu, X } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../apis/Apis";
// import { useAuth } from "../context/AuthContext"; // Import Auth Context

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  // const { user, logout } = useAuth(); // Get user & logout from context

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const endpoint = isSignup ? "/user/signup" : "/user/login";
    try {
      const response = await API.post(endpoint, data);
      console.log("Success:", response.data);
      toast.success(response.data.message)
      if (isSignup) {
        setIsSignup(false); // Switch to login form after signup
      } else {
        setIsModalOpen(false); // Close modal after successful login
      }
    } catch (error) {
      toast.error("Error:", error.response?.data || error.message);
    }
    reset();
  };

  const menuItems = ["Home", "About", "Courses", "Admissions", "Faculty", "Student Life", "Contact"];

  return (
    <nav className="bg-white shadow-md py-4 px-6 sticky top-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-700">ABC College</h1>
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {menuItems.map((item, index) => (
            <li key={index} className="relative group">
              <a
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className={`relative block pb-2 transition ${
                  active === item ? "text-blue-600 font-semibold" : "text-gray-700 hover:text-blue-600"
                }`}
                onClick={() => setActive(item)}
              >
                {item}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-blue-600 transition-all duration-300 ${
                    active === item ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </a>
            </li>
          ))}
        </ul>

        {/* Show Login button only if user is NOT logged in */}
        
          <button
            onClick={() => setIsModalOpen(true)}
            className="hidden md:inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Login
          </button>
       
          {/* <button
            onClick={logout}
            className="hidden md:inline-block px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
          >
            Logout
          </button> */}
        

        <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md py-4 px-6 space-y-4">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className={`block text-gray-700 hover:text-blue-600 transition ${
                active === item ? "text-blue-600 font-semibold" : ""
              }`}
              onClick={() => {
                setActive(item);
                setIsOpen(false);
              }}
            >
              {item}
            </a>
          ))}

          {/* Show Login button in mobile menu only if user is NOT logged in */}
          {!user ? (
            <button
              onClick={() => {
                setIsModalOpen(true);
                setIsOpen(false);
              }}
              className="block w-full px-6 py-2 bg-blue-600 text-white rounded-lg font-medium text-center hover:bg-blue-700 transition"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="block w-full px-6 py-2 bg-red-600 text-white rounded-lg font-medium text-center hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      )}

      {/* Authentication Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-10">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[450px] relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
              <X size={24} />
            </button>
            <h2 className="text-3xl font-bold text-center mb-6">{isSignup ? "Sign Up" : "Login"}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {isSignup && (
                <div>
                  <label className="block text-gray-700">Username</label>
                  <input
                    type="text"
                    {...register("username", { required: "Username is required" })}
                    className="w-full border p-3 rounded"
                  />
                  {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                </div>
              )}
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full border p-3 rounded"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                  className="w-full border p-3 rounded"
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
                {isSignup ? "Sign Up" : "Login"}
              </button>
            </form>
            <p className="mt-6 text-center">
              {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
              <button onClick={() => setIsSignup(!isSignup)} className="text-blue-600 hover:underline">
                {isSignup ? "Login" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
