import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
    Book,
    School,
    Users,
    GraduationCap,
    Phone,
    Mail,
    MapPin,
    Trophy,
    Medal,
    Star,
    FileText,
    UserPlus,
    FileEdit,
    PencilRuler,
    Activity,
    UserCheck,
    HeartHandshake,
    Dumbbell,
    Music,
    Code,
    Handshake,
    Landmark,
    Briefcase,
  
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LandingPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="h-screen flex flex-col items-center justify-center bg-blue-100 text-blue-700 text-center px-6">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-bold">Welcome to ABC College</h2>
          <p className="text-lg mt-4">
            Empowering students to achieve excellence through world-class education and vibrant campus life.
          </p>
          <Link to="/apply" className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
            Apply Now
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-100 text-gray-700 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <School className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h2 className="text-4xl font-bold">About Us</h2>
          <p className="text-lg mt-4">
            ABC College is a premier institution dedicated to fostering academic excellence and holistic development.
            With a legacy spanning over two decades, we take pride in providing top-tier education, state-of-the-art facilities, 
            and an engaging campus culture.
          </p>
          <p className="text-lg mt-4">
            Our curriculum is designed to equip students with industry-relevant skills, preparing them to excel in their careers.
            With a diverse student community, expert faculty, and modern infrastructure, ABC College offers a dynamic learning environment.
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20 bg-white text-gray-700 text-center px-6">
        <div className="max-w-5xl mx-auto">
          <Book className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h2 className="text-4xl font-bold">Our Courses</h2>
          <p className="text-lg mt-4">Explore a variety of programs tailored for your future success.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {[
              { name: "Computer Science", duration: "4 Years" },
              { name: "Business Management", duration: "3 Years" },
              { name: "Psychology", duration: "3 Years" },
              { name: "Engineering", duration: "4 Years" },
              { name: "Graphic Design", duration: "2 Years" },
              { name: "Digital Marketing", duration: "1 Year" },
            ].map((course, index) => (
              <div key={index} className="p-6 border rounded-lg shadow-md hover:shadow-lg transition">
                <h3 className="text-xl font-bold">{course.name}</h3>
                <p className="mt-2 text-gray-600">Duration: {course.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

       {/* Admissions Section */}
       <section id="admissions" className="py-20 bg-white text-gray-700 text-center px-6">
        <div className="max-w-5xl mx-auto">
          <FileText className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h2 className="text-4xl font-bold">Admissions</h2>
          <p className="text-lg mt-4">
            Start your journey at ABC College. Follow our simple admission process to secure your seat.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { step: "1", title: "Submit Application", description: "Fill out the online application form with necessary details.", icon: <FileEdit className="w-12 h-12 text-blue-600 mx-auto mb-3" /> },
              { step: "2", title: "Entrance Test", description: "Appear for the entrance test or qualify through merit-based selection.", icon: <PencilRuler className="w-12 h-12 text-blue-600 mx-auto mb-3" /> },
              { step: "3", title: "Interview & Admission", description: "Attend an interview (if applicable) and secure your admission.", icon: <UserPlus className="w-12 h-12 text-blue-600 mx-auto mb-3" /> },
            ].map((item, index) => (
              <div key={index} className="p-6 border rounded-lg shadow-md hover:shadow-lg transition">
                {item.icon}
                <h3 className="text-2xl font-bold text-blue-600">Step {item.step}</h3>
                <h4 className="text-xl font-semibold mt-2">{item.title}</h4>
                <p className="mt-2 text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <Link to="/apply" className="mt-8 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
            Apply Now
          </Link>
        </div>
      </section>

      {/* Faculty Section */}
      <section id="faculty" className="py-20 bg-gray-100 text-gray-700 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <Users className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h2 className="text-4xl font-bold">Meet Our Faculty</h2>
          <p className="text-lg mt-4">
            Our faculty members are experienced educators, researchers, and industry professionals
            dedicated to shaping the leaders of tomorrow.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {[
              { name: "Dr. Ananya Sharma", role: "Head of Computer Science" },
              { name: "Prof. Rajesh Mehta", role: "Business & Management" },
              { name: "Dr. Pooja Kapoor", role: "Psychology & Counseling" },
              { name: "Dr. Arvind Kumar", role: "Engineering & Technology" },
              { name: "Prof. Sneha Rao", role: "Design & Creativity" },
              { name: "Dr. Karthik Nair", role: "Marketing & Entrepreneurship" },
            ].map((faculty, index) => (
              <div key={index} className="p-6 border rounded-lg shadow-md hover:shadow-lg transition">
                <UserCheck className="w-12 h-12 mx-auto text-blue-600" />
                <h3 className="text-xl font-bold mt-4">{faculty.name}</h3>
                <p className="mt-2 text-gray-600">{faculty.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Life Section */}
      <section id="student-life" className="py-20 bg-white text-gray-700 text-center px-6">
        <div className="max-w-5xl mx-auto">
          <Activity className="w-16 h-16 mx-auto mb-4 text-gray-600" />
          <h2 className="text-4xl font-bold">Student Life</h2>
          <p className="text-lg mt-4">
            At ABC College, student life is vibrant and diverse. We encourage students to participate in clubs, sports, and cultural events.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            {[
              { name: "Sports & Athletics", description: "Join our various sports teams and compete at intercollegiate levels.", icon: <Dumbbell className="w-12 h-12 mx-auto text-blue-600" /> },
              { name: "Cultural Events", description: "Participate in music, dance, and drama festivals held throughout the year.", icon: <Music className="w-12 h-12 mx-auto text-blue-600" /> },
              { name: "Tech Clubs", description: "Explore AI, Robotics, and coding through our dynamic student-led clubs.", icon: <Code className="w-12 h-12 mx-auto text-blue-600" /> },
              { name: "Volunteering", description: "Give back to the community through social service initiatives.", icon: <Handshake className="w-12 h-12 mx-auto text-blue-600" /> },
              { name: "Student Council", description: "Be a leader and represent your fellow students in the council.", icon: <Landmark className="w-12 h-12 mx-auto text-blue-600" /> },
              { name: "Networking & Conferences", description: "Attend industry events and career fairs to boost your future prospects.", icon: <Briefcase className="w-12 h-12 mx-auto text-blue-600" /> },
            ].map((activity, index) => (
              <div key={index} className="p-6 border rounded-lg shadow-md hover:shadow-lg transition">
                {activity.icon}
                <h3 className="text-xl font-bold mt-4">{activity.name}</h3>
                <p className="mt-2 text-gray-600">{activity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-100 text-gray-700 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold">Contact Us</h2>
          <p className="text-lg mt-4">We'd love to hear from you! Reach out to us for any queries.</p>

          <div className="mt-8 max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...register("name", { required: "Name is required" })}
                    className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    {...register("email", { required: "Email is required" })}
                    className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  {...register("message", { required: "Message is required" })}
                  className="p-3 border rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="4"
                ></textarea>
                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>


      <Footer />
    </>
  );
};

export default LandingPage;
