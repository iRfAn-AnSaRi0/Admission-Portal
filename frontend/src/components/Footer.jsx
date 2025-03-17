import React from "react";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* College Info */}
        <div>
          <h2 className="text-2xl font-bold">ABC College</h2>
          <p className="mt-2 text-gray-300">
            Shaping the future with quality education. Join us to build a brighter tomorrow.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2">
            {["Home", "About", "Courses", "Admissions", "Faculty", "Student Life", "Contact"].map((item, index) => (
              <li key={index}>
                <a href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-gray-300 hover:text-white transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <ul className="mt-2 space-y-2">
            <li className="flex items-center space-x-2">
              <MapPin size={18} />
              <span className="text-gray-300">123 College St, City, Country</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone size={18} />
              <span className="text-gray-300">+123 456 7890</span>
            </li>
            <li className="flex items-center space-x-2">
              <Mail size={18} />
              <span className="text-gray-300">info@abccollege.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Links & Copyright */}
      <div className="mt-10 border-t border-gray-700 pt-6 text-center">
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-gray-300 hover:text-white transition">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition">
            <Instagram size={20} />
          </a>
        </div>
        <p className="mt-4 text-gray-400 text-sm">&copy; {new Date().getFullYear()} ABC College. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
