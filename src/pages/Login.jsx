import Lottie from "lottie-react";
import React from "react";
import { FaGoogle } from "react-icons/fa6";
import lottianimation from "../assets/lottifiles.json";
import { NavLink } from "react-router";
const Login = () => {
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col gap-10 lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <Lottie animationData={lottianimation} loop={true}></Lottie>
            <p className="text-sm text-center dark:text-gray-600">
              Not have account?
              <NavLink
                to="/ragister"
                className="focus:underline hover:underline"
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
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="Email" />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn bg-white text-black border-[#e5e5e5]">
                  <FaGoogle className="text-amber-400 " />
                  Login with Google
                </button>
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
