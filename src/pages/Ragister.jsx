import React, { use } from "react";
import { FaGoogle } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/Authcontext";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { auth } from "../Firebaseauth/firebase.init";

const Ragister = () => {
  const { creatUser, setUser, loading, setloading, signingoogle } =
    use(AuthContext);
  const navigate = useNavigate();

  // for passwod validation
  const handlePasswordValidation = (e) => {
    const value = e.target.value;
    const isValid = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(value);
    e.target.setCustomValidity(
      isValid
        ? ""
        : "Password must have uppercase, lowercase and be at least 6 characters"
    );
  };

  const googlesignin = () => {
    console.log("btn clicked");

    signingoogle()
      .then(() => {
        toast.success("You have successfully logged in with Google!");
        navigate("/");
      })
      .catch((error) => {
        toast.error("Google login failed: " + error.message);
      });
  };

  const HandleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoUrl = form.photoUrl.value;

    const user = {
      name,
      email,
      password,
      photoUrl,
    };
    creatUser(email, password)
      .then((userCredential) => {
        updateProfile(userCredential.user, {
          displayName: name,
          photoURL: photoUrl,
        })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photoUrl });

            toast.success(
              "You have successfully registered and updated profile!"
            );
            navigate("/");
          })
          .catch((error) => {
            alert("Profile update failed: " + error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });

    console.log("Registration Data:", name, email, password, photoUrl);
  };

  return (
    <div>
      <div className="mt-10 w-full mx-auto max-w-md p-4 rounded-md shadow sm:p-8 dark:bg-gray-50 dark:text-gray-800">
        <h2 className="mb-3 text-3xl font-semibold text-center">
          Sign Up to your account
        </h2>
        <p className="text-sm text-center dark:text-gray-600">
          Already have account?
          <NavLink to="/login" className="focus:underline hover:underline">
            Login here
          </NavLink>
        </p>
        <div className="my-6 space-y-4">
          <button
            onClick={googlesignin}
            aria-label="Login with Google"
            type="button"
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
          >
            <FaGoogle />
            <p>Login with Google</p>
          </button>
        </div>
        <div className="flex items-center w-full my-4">
          <hr className="w-full dark:text-gray-600" />
          <p className="px-3 dark:text-gray-600">OR</p>
          <hr className="w-full dark:text-gray-600" />
        </div>
        <form onSubmit={HandleRegister} className="space-y-8">
          <div className="space-y-4">
            {" "}
            <div className="space-y-2">
              <label className="block text-sm">Your name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
            </div>{" "}
            <div className="space-y-2">
              <label className="block text-sm">Your Photo-Url</label>
              <input
                type="text"
                name="photoUrl"
                placeholder="Photo-Url"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm">Password</label>
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="text-xs hover:underline dark:text-gray-600"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                name="password"
                onInput={handlePasswordValidation}
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full btn px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
          >
            Sign in
          </button>{" "}
          <NavLink
            to="/"
            type="button"
            className="w-full btn px-8 py-3 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50"
          >
            Back To Home
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default Ragister;
