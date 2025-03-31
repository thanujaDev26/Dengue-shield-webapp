import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../ProtectedRoutes/AuthContext.jsx";
import toast from "react-hot-toast";
import authService from "../../service/authService.js";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [formInput, setFormInput] = useState(initialState);
  const [Error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleFormInput = (event) => {
    const { value, name } = event.target;
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formInput.email.trim()) {
      toast.error("User email is required");
      return;
    }

    if (!formInput.password.trim()) {
      toast.error("User password is required");
      return;
    }
    setLoading(true);

    try {
      const response = await authService.handleLogin(
        formInput.email,
        formInput.password
      );
      login(response);
      toast.success("welcome back!");
      navigate("/dashboard");
    } catch (error) {
      const message = error?.response?.data?.message || "Login failed";
      setError(message);
      toast.error(Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="m-0">
      <div className="flex md:flex-row flex-col p-10 items-center bg-gradient-to-b from-white to-teal-200 min-h-1/2 m-0 w-full">
        <div className="md:w-2/4 p-12 text-center md:text-center">
          <h1 className="text-4xl font-bold text-gray-800 leading-tight pb-5">
            Welcome Back !
          </h1>
          <h2 className="text-3xl font-bold text-gray-800 leading-tight md:block hidden">
            Please login to continue
          </h2>
          <img
            src="images/Login.png"
            alt="Illustration"
            className="w-full h-auto object-cover md:block hidden"
          />
        </div>

        <div className="md:w-2/4 relative border-2 border-teal-300 rounded-3xl p-4 grid place-items-center">
          <div className="p-5">
            <h1 className="text-4xl font-bold text-gray-800 leading-tight pt-5">
              Login
            </h1>
          </div>
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
                type="password"
                name="password"
                className="w-10/12 h-10 bg-transparent m-5 p-4 focus:outline-none border-b-2 border-gray-300 focus:border-blue-400 transition duration-300"
                placeholder="Enter Password"
                value={formInput.password}
                onChange={handleFormInput}
              />
              <div className="w-10/12 flex">
                <div className="flex w-1/2 text-left justify-start">
                  <input type="checkbox" className="m-1 w-10" />
                  <p className="font-semibold">Remember me</p>
                </div>
                <div className="flex text-right justify-end w-1/2">
                  <a className="m-1 font-semibold" href="">
                    Forgot Password?
                  </a>
                </div>
              </div>
              <button
                type="submit"
                className="md:w-1/4 w-1/2 px-6 py-3 my-8 bg-teal-500 text-white rounded-3xl hover:bg-teal-300 hover:text-black"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className="w-full px-4 flex justify-center items-center">
              <p>
                Dont have an account?{" "}
                <a href="/sign-up" className="font-bold">
                  Sign Up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
