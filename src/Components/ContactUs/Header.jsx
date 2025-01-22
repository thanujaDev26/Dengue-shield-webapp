import React from 'react';

export default function Header() {
  return (
    <div className="bg-gradient-to-b from-teal-100 to-transparent min-h-screen flex items-center justify-center py-5  m-30">
      
      {/* Card Container */}
      <div className="w-11/12 md:w-8/12  lg:w-7/12  bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row ">
        
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-teal-400 to-teal-600 text-white p-8 flex flex-col justify-between">
          
          <div >
            <h2 className="text-3xl  text-center font-extrabold mb-6 leading-relaxed">
              We're Here to Help
            </h2>

            {/* Contact Details */}
            <div className="space-y-6  pl-5 pt-10">
              <div className="flex items-center space-x-4">
                <i className="fas fa-envelope fa-lg"></i>
                <p className="text-lg">
                  <span className="font-semibold">Email:</span> info@dengueshield.com
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <i className="fas fa-phone fa-lg"></i>
                <p className="text-lg">
                  <span className="font-semibold">Phone:</span> +94567890562
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <i className="fas fa-phone fa-lg"></i>
                <p className="text-lg">
                  <span className="font-semibold">Phone:</span> +94567890562
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <i className="fas fa-map-marker-alt fa-lg"></i>
                <p className="text-lg">
                  <span className="font-semibold">Address:</span> 123 Health St, City, Country
                </p>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="mt-8 flex space-x-6  justify-center pb-20">
            <a href="#" className="hover:scale-110 transition-transform">
              <i className="fab fa-facebook fa-2x"></i>
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <i className="fab fa-whatsapp fa-2x"></i>
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            <a href="#" className="hover:scale-110 transition-transform">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 relative">
          <img 
            src="images/Contactus_main.png"
            className="w-full  hidden md:block h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />

          {/* Overlay Icon */}
          <div className="absolute bottom-8 right-8 bg-white p-4 rounded-full shadow-lg">
            <i className="fas fa-paper-plane fa-2x text-blue-500"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
