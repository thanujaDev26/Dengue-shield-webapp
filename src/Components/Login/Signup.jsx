import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import authService from "../../service/authService.js";

const initialFormData = {
  email: "",
  username: "",
  password: "",
  confirmPassword: "",
};
const Signup = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formInput, setFormInput] = useState(initialFormData);

  const handleFormInput = (e) => {
    const { name, value } = e.target;
    setFormInput({ ...formInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formInput.email.trim()) {
      toast.error("Email is required");
      return;
    }
    if (!formInput.username.trim()) {
      toast.error("Username is required");
      return;
    }
    if (!formInput.password.trim()) {
      toast.error("Password is required");
      return;
    }
    if (formInput.password !== formInput.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    console.log("Form data submitted:", formInput);
    try {
      setIsSubmitting(true);
      await authService.register(
        formInput.username,
        formInput.email,
        formInput.password
      );
      toast.success("Registration successful!");
      setFormInput(initialFormData); // Reset form
      navigate("/sign-in");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="m-0">
      <div className="flex md:flex-row flex-col p-10 items-center bg-gradient-to-b from-white to-teal-200 min-h-1/2 m-0 w-full">
        <div className="md:w-2/4 p-12 text-center md:text-center">
          <h1 className="text-4xl font-bold text-gray-800 leading-tight pb-5 md:hidden block">
            Welcome!
          </h1>
          <h1 className="text-4xl font-bold text-gray-800 leading-tight pb-5 md:block hidden">
            Welcome to
          </h1>
          <h2 className="text-3xl font-bold text-gray-800 leading-tight md:block hidden">
            Our Dengue Detection and Mitigation System!
          </h2>
          <img
            src="images/Sign-up.png"
            alt="Illustration"
            className="w-full h-auto object-cover md:block hidden"
          />
        </div>

        <div className="md:w-2/4 relative border-2 border-teal-300 rounded-3xl p-4 grid place-items-center">
          <div className="p-2">
            <h1 className="text-4xl font-bold text-gray-800 leading-tight pt-5">
              Sign Up
            </h1>
          </div>
          <h2 className="text-xl font-bold text-gray-500 leading-tight pt-5">
            Create your account to get started
          </h2>
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full grid place-items-center">
              <input
                type="email"
                name="email"
                className="w-10/12 h-10 bg-transparent m-5 p-4 focus:outline-none border-b-2 border-gray-300 focus:border-blue-400 transition duration-300"
                placeholder="Enter Your Email"
                value={formInput.email}
                onChange={handleFormInput}
              />
              <input
                type="text"
                name="username"
                className="w-10/12 h-10 bg-transparent m-5 p-4 focus:outline-none border-b-2 border-gray-300 focus:border-blue-400 transition duration-300"
                placeholder="Enter Username"
                value={formInput.username}
                onChange={handleFormInput}
              />
              <input
                type="password"
                name="password"
                className="w-10/12 h-10 bg-transparent m-5 p-4 focus:outline-none border-b-2 border-gray-300 focus:border-blue-400 transition duration-300"
                placeholder="Enter Password"
                value={formInput.password}
                onChange={handleFormInput}
              />
              <input
                type="password"
                name="confirmPassword"
                className="w-10/12 h-10 bg-transparent m-5 p-4 focus:outline-none border-b-2 border-gray-300 focus:border-blue-400 transition duration-300"
                placeholder="Confirm Password"
                value={formInput.confirmPassword}
                onChange={handleFormInput}
              />
              <button
                type="submit"
                className="md:w-1/4 w-1/2 px-6 py-3 my-8 bg-teal-500 text-white rounded-3xl hover:bg-teal-300 hover:text-black"
              >
                Sign Up
              </button>
            </div>
            <div className="w-full px-4 flex justify-center items-center">
              <p>
                Already have an account?{" "}
                <Link to="/sign-in" className="font-bold">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
