import React, { use, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../context/Authcontext";
import { IoHandLeft } from "react-icons/io5";
import { toast } from "react-toastify";

const Navber = () => {
  const { user, setUser, Logout } = use(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    Logout()
      .then(() => {
        toast.success("You have successfully logged out!");
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Logout failed: " + error.message);
      });
  };
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-blue-500 underline" : ""
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-blue-500 underline" : ""
                }
                to="/AllArticles"
              >
                All Articles
              </NavLink>
            </li>{" "}
          </ul>
        </div>
        <p className="btn btn-ghost text-xl">
          Shikkha<span className="text-blue-500 font-semibold">Zone</span>
        </p>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-500 underline" : ""
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-500 underline" : ""
              }
              to="/AllArticles"
            >
              All Articles
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    {user?.displayName || "User Name"}
                    <span className="badge">New</span>
                  </a>
                </li>

                <li>
                  <button onClick={handleLogout}>Log-Out</button>
                </li>
                {user && (
                  <>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "text-blue-500 underline" : ""
                        }
                        to="/PostArticle"
                      >
                        Post Article
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className={({ isActive }) =>
                          isActive ? "text-blue-500 underline" : ""
                        }
                        to={`/MyArticle/author/${user.uid}`}
                      >
                        My Article
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-4 items-center ">
              <NavLink to="login" className=" btn border-t-5 border-b-blue-500">
                Login
              </NavLink>
              <NavLink
                to="ragister"
                className=" btn border-t-5 border-b-blue-500"
              >
                Register
              </NavLink>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navber;
