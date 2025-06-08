import React from "react";
import { LiaLinkedinIn } from "react-icons/lia";
import { MdOutlineFacebook } from "react-icons/md";
import { NavLink } from "react-router";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Logo */}
            <div>
              <h2 className="text-2xl font-bold">
                {" "}
                <NavLink to="/" className=" text-xl">
                  Shikkha
                  <span className="text-blue-500 font-semibold">Zone</span>
                </NavLink>{" "}
              </h2>
            </div>

            {/* Links */}
            <div className="flex flex-col md:flex-row gap-4 text-sm text-gray-300">
              <a href="#" className="hover:text-white transition">
                About Us
              </a>
              <a href="#" className="hover:text-white transition">
                Contact Us
              </a>
              <a href="#" className="hover:text-white transition">
                Terms & Conditions
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                target="_blank"
                href="https://web.facebook.com/alvinmmonir321135"
                aria-label="facebook"
                className="hover:scale-110 transition-transform"
              >
                <MdOutlineFacebook className="w-8 h-8" />
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/alvin-monir/"
                aria-label="LinkedIn"
                className="hover:scale-110 transition-transform"
              >
                <LiaLinkedinIn className="w-8 h-8" />
              </a>
            </div>
          </div>

          {/* Bottom text */}
          <div className="mt-8 text-center text-sm text-gray-500">
            &copy; 2025 ShikkhaZone. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
