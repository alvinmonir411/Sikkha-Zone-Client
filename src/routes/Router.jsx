import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import AllArticles from "./../pages/AllArticles";
import PostArticle from "./../pages/PostArticle";
import Login from "../pages/Login";
import Ragister from "../pages/Ragister";
import PrivateRoute from "../Privetrout/PrivateRoute ";
import Home from "../layouts/Home";
import FilterArtilce from "../components/FilterArtilce";
import ArticlesDetails from "../components/ArticlesDetails";
import MyArticles from "./../pages/MyArticles";
import UpdateArticle from "../components/UpdateArticle";
import Eror from "../Eroor/Eror";
import AboutUs from "../pages/AboutUs ";
import Admin from "../AdminDashboard/Admin";
import Contact from "../components/Contact";
import MyBookmarks from "../AdminDashboard/MyBookmarks";
import Service from "../components/Services";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Eror />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: "/AllArticles",
        element: <AllArticles />,
      },
      {
        path: "/about",
        Component: AboutUs,
      },

      {
        path: "conatct",
        Component: Contact,
      },
      {
        path: "services",
        Component: Service,
      },
      {
        path: "/PostArticle",
        element: (
          <PrivateRoute>
            <PostArticle />
          </PrivateRoute>
        ),
      },
      {
        path: "/category/:categoryName",
        element: (
          <PrivateRoute>
            <FilterArtilce />
          </PrivateRoute>
        ),
      },
      {
        path: "myBookmarks",
        Component: MyBookmarks,
      },
      {
        path: "/Articles/id/:_id",
        element: (
          <PrivateRoute>
            <ArticlesDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "MyArticle/author/:author_email",
        element: (
          <PrivateRoute>
            <MyArticles />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-article/:id",
        element: (
          <PrivateRoute>
            <UpdateArticle />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        Component: Admin,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/ragister",
    element: <Ragister />,
  },
]);
