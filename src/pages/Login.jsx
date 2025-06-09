import Lottie from "lottie-react";
import React, { use } from "react";
import { FaGoogle } from "react-icons/fa6";
import lottianimation from "../assets/lottifiles.json";
import { NavLink, useNavigate } from "react-router";

import { toast } from "react-toastify";
import { AuthContext } from "./../context/AuthContext";
const Login = () => {
  const Navigate = useNavigate();

  const { LoginUser, setUser, signingoogle } = use(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    const user = { email, password };
    "Login button clicked", user;
    LoginUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        "User logged in successfully:", user;
        toast.success("Login successful!");

        Navigate("/");
      })
      .catch((error) => {
        console.error("Error logging in with Google:", error);
      });
  };

  const handleGoogleLogin = () => {
    signingoogle()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("You have successfully logged in with Google!");
        Navigate("/");
      })
      .catch((error) => {
        console.error("Error logging in with Google:", error);
      });
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col gap-10 lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <Lottie animationData={lottianimation} loop={true}></Lottie>
            <p className="text-sm text-center dark:text-primary-600">
              Not have account?
              <NavLink
                to="/ragister"
                className="focus:underline hover:underline text-blue-400"
              >
                Register here
              </NavLink>
            </p>
            <NavLink to="/" className="btn w-full mt-5">
              Back to Home
            </NavLink>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleLogin} className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="input"
                  placeholder="Password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>

                <button type="submit" className="btn btn-neutral mt-4">
                  Login
                </button>
              </form>
              <button
                onClick={handleGoogleLogin}
                className="btn bg-base-100 text-black border-[#e5e5e5]"
              >
                <FaGoogle className="text-amber-400 " />
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
