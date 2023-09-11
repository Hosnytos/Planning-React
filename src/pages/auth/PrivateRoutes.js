import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  // Verify if the user is already connected or not for redirecting
  let isLoggedIn = true;
  let isLoggedInData = localStorage.getItem("isLogged");
  let isCurrentUser = localStorage.getItem("currentUser");

  if (isLoggedInData === "false") {
    isLoggedIn = false;
  } else {
    if (isCurrentUser === "jordynaiya@gmail.com") {
      console.log("CA MARCHE COMPARAISON OK");
    } else {
      isLoggedIn = false;
      isCurrentUser = "";
      <Navigate to="/login" />;
      window.location.reload();
    }
  }

  return isLoggedIn === true ? (
    <Outlet replace={true} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
