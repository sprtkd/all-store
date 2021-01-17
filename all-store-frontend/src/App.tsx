import React from "react";
import "./app.css";
import Footer from "./lib/harness/Footer";
import Appbar from "./lib/harness/Appbar";
import Home from "./lib/routes/home";
import AppDetails from "./lib/routes/AppDetails";

function App() {
  return (
    <div className="baseApp">
      <Appbar />
      <Home />
      <AppDetails />
      <Footer />
    </div>
  );
}

export default App;
