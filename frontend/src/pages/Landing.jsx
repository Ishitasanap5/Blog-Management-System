import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F1EFE8]">
      {/* Header */}
      <header className="bg-[#534AB7] text-white p-6 flex justify-between items-center shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold">Inkwell</h1>
        <nav className="space-x-6 text-lg">
          <Link to="/" className="hover:text-[#EEEDFE] transition">Home</Link>
          <Link to="/login" className="hover:text-[#EEEDFE] transition">Login</Link>
          <Link to="/register" className="hover:text-[#EEEDFE] transition">Sign Up</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6 bg-[#EEEDFE]">
        <h2 className="text-5xl font-extrabold text-[#26215C] mb-6">Write, Share, and Inspire</h2>
        <p className="text-[#888780] mb-8 max-w-2xl text-lg">
          Create amazing blogs, explore trending posts, and connect with a community of passionate writers.
        </p>
        <Link 
          to="/register" 
          className="bg-[#7F77DD] text-white px-8 py-4 rounded-lg hover:bg-[#534AB7] transition font-semibold"
        >
          Get Started
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-[#534AB7] text-2xl font-bold mb-4">Write</h3>
            <p className="text-[#888780]">
              Craft beautiful blog posts with our intuitive editor and share your thoughts effortlessly.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-[#1D9E75] text-2xl font-bold mb-4">Engage</h3>
            <p className="text-[#888780]">
              Connect with other writers, comment on posts, and build your own community.
            </p>
          </div>
          <div className="p-6 border rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-[#378ADD] text-2xl font-bold mb-4">Discover</h3>
            <p className="text-[#888780]">
              Explore trending blogs, featured articles, and gain inspiration from top writers.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6 bg-[#7F77DD] text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
        <p className="mb-8 max-w-xl mx-auto text-[#EEEDFE]">
          Join Inkwell today and be part of a thriving writing community.
        </p>
        <Link 
          to="/register" 
          className="bg-[#534AB7] px-8 py-4 rounded-lg hover:bg-[#26215C] transition font-semibold"
        >
          Join Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-[#26215C] text-white p-8 text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} Inkwell. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:text-[#EEEDFE]">Privacy</a>
          <a href="#" className="hover:text-[#EEEDFE]">Terms</a>
          <a href="#" className="hover:text-[#EEEDFE]">Contact</a>
        </div>
      </footer>
    </div>
  );
}