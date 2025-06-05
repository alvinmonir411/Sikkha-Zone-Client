import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import AllArticles from "./../pages/AllArticles";
import PostArticle from "./../pages/PostArticle";
import MyArticles from "./../pages/MyArticles";
import Login from "../pages/Login";
import Ragister from "../pages/Ragister";
import PrivateRoute from "../Privetrout/PrivateRoute ";

import Home from "../layouts/Home";
import FilterArtilce from "../components/FilterArtilce";
import ArticlesDetails from "../components/ArticlesDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
        path: "/Articles/id/:_id",
        element: (
          <PrivateRoute>
            <ArticlesDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/MyArticle",
        element: (
          <PrivateRoute>
            <MyArticles />
          </PrivateRoute>
        ),
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
