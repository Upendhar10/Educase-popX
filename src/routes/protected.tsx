import { Navigate, Outlet } from "react-router-dom";

const Protected = () => {
  // Get the logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");

  if (!user) {
    // Redirect to login if no user is found
    return <Navigate to="/login" replace />;
  }

  // Render the protected component (account)
  return <Outlet />;
};

export default Protected;
