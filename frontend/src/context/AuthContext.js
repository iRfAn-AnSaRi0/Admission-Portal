// import { createContext, useContext, useEffect, useState } from "react";
// import { useContext } from "react";
// import API from "../apis/Apis";

// // Create Auth Context
// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Function to login user
//   const login = async (formData) => {
//     try {
//       const { data } = await API.post("/user/login", formData); 
//       setUser(data.user);
//     } catch (error) {
//       console.error("Login failed:", error.response?.data || error.message);
//     }
//   };

//   // Function to signup user
//   const signup = async (formData) => {
//     try {
//       const { data } = await API.post("/user/signup", formData); 
//       setUser(data.user);
//     } catch (error) {
//       console.error("Signup failed:", error.response?.data || error.message);
//     }
//   };

//   // Logout function
//   const logout = async () => {
//     try {
//       await API.post("/user/logout");
//       setUser(null);
//     } catch (error) {
//       console.error("Logout failed:", error.response?.data || error.message);
//     }
//   };

//   // Fetch user profile on page refresh
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const { data } = await API.get("/user/profile"); 
//         setUser(data);
//       } catch (error) {
//         console.error("User fetch failed:", error);
//         logout();
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProfile();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use auth context
// export const useAuth = () => useContext(AuthContext);
