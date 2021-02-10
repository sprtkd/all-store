import React from "react";
import "./app.css";
import Footer from "./lib/harness/Footer";
import Appbar from "./lib/harness/Appbar";
import Home from "./lib/routes/home";
import ReviewList from "./lib/review/review-list";
import UserLoginRegister from "./lib/user/user-login-register";
import {
  BrowserRouter,
  Route, Switch
} from "react-router-dom";
import Page404 from "./lib/harness/404";
import TemporaryDrawer from "./lib/harness/SideDrawer";

function App() {
  return (
    <div className="baseApp">
      <BrowserRouter>
        <Appbar />
        <TemporaryDrawer />
        <div className="baseDiv">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/user" exact component={UserLoginRegister} />
            <Route path="/reviews" exact component={ReviewList} />
            <Route path="/" component={Page404} />
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
