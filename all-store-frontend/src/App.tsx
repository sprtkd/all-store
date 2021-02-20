import React from "react";
import "./app.css";
import Footer from "./lib/harness/Footer";
import Appbar from "./lib/harness/Appbar";
import Home from "./lib/routes/home";
import ReviewList from "./lib/review/review-list";
import {
  BrowserRouter,
  Route, Switch
} from "react-router-dom";
import Page404 from "./lib/harness/404";
import ProgressContext from "./lib/harness/ProgressContext";
import UserPage from "./lib/routes/User";
import UserContext from "./lib/user/utils/UserContext";
import { UiUser } from "./lib/user/models/user-model";
import { Toast, ToastProp } from "./lib/harness/Toast";
import ToastContext from "./lib/harness/ToastContext";

function App() {
  const [progressBarLoading, setProgressBarLoading] = React.useState(false);
  const [toaster, setToaster] = React.useState<ToastProp>({
    severity: "info",
    state: false,
    text: "string"
  });
  const [userLogin, setUserLogin] = React.useState<UiUser>({
    isLoggedIn: false,
    username: "",
    auth: ""
  });

  return (
    <div className="baseApp">
      <UserContext.Provider value={{ user: userLogin, setValue: setUserLogin }}>
        <ToastContext.Provider value={{ toaster: toaster, setValue: setToaster }}>
          <ProgressContext.Provider
            value={{ isLoading: progressBarLoading, setValue: setProgressBarLoading }}
          >
            <BrowserRouter>
              <Appbar />
              <Toast />
              <div className="baseDiv">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/user" exact component={UserPage} />
                  <Route path="/reviews" exact component={ReviewList} />
                  <Route path="/" component={Page404} />
                </Switch>
              </div>
              <Footer />
            </BrowserRouter>
          </ProgressContext.Provider>
        </ToastContext.Provider>
      </UserContext.Provider>
    </div >
  );
}

export default App;
