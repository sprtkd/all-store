import React from "react";
import "./app.css";
import Footer from "./lib/harness/Footer";
import Appbar from "./lib/harness/Appbar";
import Home from "./lib/routes/home";
import ReviewList from "./lib/review/review-list";
import UserLoginRegister from "./lib/user/user-login-register";

function App() {
  return (
    <div className="baseApp">
      <Appbar />
      <UserLoginRegister />
      <Home />
      <ReviewList />
      <Footer />
    </div>
  );
}

export default App;
