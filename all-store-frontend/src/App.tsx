import React from "react";
import "./app.css";
import Footer from "./lib/harness/Footer";
import Appbar from "./lib/harness/Appbar";
import Home from "./lib/routes/home";
import AppDetails from "./lib/routes/AppDetails";
import HoverRating from "./lib/review/rating-big";

function App() {
  return (
    <div className="baseApp">
      <Appbar />
      <Home />
      {/* <AppDetails /> */}
      <HoverRating />
      <br />
      <Footer />
    </div>
  );
}

export default App;
