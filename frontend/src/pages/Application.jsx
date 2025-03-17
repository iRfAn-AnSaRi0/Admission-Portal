import { useState } from "react";
import React from "react";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../apis/Apis";
import { useNavigate } from "react-router-dom";

const Application = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("DOB", data.DOB);
    formData.append("gender", data.gender);
    formData.append("state", data.state);
    formData.append("city", data.city);
    formData.append("address", data.address);
    formData.append("course", data.course);

    if (imageFile) {
      formData.append("result", imageFile);
    }

    try {
      await API.post(`/apply`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success("Application submitted successfully!");
      navigate("/");
      reset();
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      toast.error(error.response?.data?.error || "Error submitting application!");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
      setValue("result", file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setValue("result", null);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Admission Form</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Name is required" })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <input
              type="tel"
              placeholder="Phone"
              {...register("phone", { required: "Phone is required" })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          {/* DOB */}
          <div>
            <input
              type="date"
              {...register("DOB", { required: "Date of Birth is required" })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.DOB && <p className="text-red-500 text-sm">{errors.DOB.message}</p>}
          </div>

          {/* Gender */}
          <div>
            <select
              {...register("gender", { required: "Gender is required" })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
          </div>

          {/* State, City, Address, Course */}
          {["state", "city", "address", "course"].map((field) => (
            <div key={field}>
              <input
                type="text"
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                {...register(field, { required: `${field} is required` })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors[field] && <p className="text-red-500 text-sm">{errors[field].message}</p>}
            </div>
          ))}

          {/* Image Upload */}
          <div className="border p-3 rounded-lg bg-gray-50">
            <label className="block mb-2 font-medium">Upload Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} className="w-full" />
            {imagePreview && (
              <div className="relative mt-3">
                <img src={imagePreview} alt="Preview" className="w-full h-40 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2 shadow-md"
                >
                  <Trash size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"
                  viewBox="0 0 24 24"
                ></svg>
                Submitting...
              </span>
            ) : (
              "Submit Application"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Application;
