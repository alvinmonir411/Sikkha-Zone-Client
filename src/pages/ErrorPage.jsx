import React from "react";

const ErrorPage = () => {
  return (
    <div>
      <h1>Error 404</h1>
      <p>Page not found!</p>
      <p>It seems the page you are looking for does not exist.</p>
      <p>Please check the URL or return to the home page.</p>
      <a href="/">Go to Home</a>
    </div>
  );
};

export default ErrorPage;
