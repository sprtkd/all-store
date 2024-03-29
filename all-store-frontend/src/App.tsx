import React from "react";
import "./app.css";
import Footer from "./lib/harness/Footer";
import Appbar from "./lib/harness/Appbar";
import Home from "./lib/routes/home";
import ReviewList from "./lib/review/review-list";
import { BrowserRouter, HashRouter, Route, Switch } from "react-router-dom";
import Page404 from "./lib/harness/404";
import ProgressContext from "./lib/harness/ProgressContext";
import UserPage from "./lib/user/User";
import UserContext from "./lib/user/utils/UserContext";
import { UiUser } from "./lib/user/models/user-model";
import { Toast, ToastProp } from "./lib/harness/Toast";
import ToastContext from "./lib/harness/ToastContext";
import { getUserInLocal } from "./lib/user/utils/user-utils";
import UserLogout from "./lib/user/user-logout";
import AboutAllStore from "./lib/routes/about";
import ThisDevice from "./lib/devices/this-device";
import { BASE_URL } from "./lib/utils/env";
import AllApps from "./lib/apps/all-apps";
import AppDetails from "./lib/apps/app-detail";

function App() {
  const [progressBarLoading, setProgressBarLoading] = React.useState(false);
  const [toaster, setToaster] = React.useState<ToastProp>({
    severity: "info",
    state: false,
    text: "string",
  });
  const [userLogin, setUserLogin] = React.useState<UiUser>(getUserInLocal());

  return (
    <div className="baseApp">
      <UserContext.Provider value={{ user: userLogin, setValue: setUserLogin }}>
        <ToastContext.Provider
          value={{ toaster: toaster, setValue: setToaster }}
        >
          <ProgressContext.Provider
            value={{
              isLoading: progressBarLoading,
              setValue: setProgressBarLoading,
            }}
          >
            <BrowserRouter basename={BASE_URL}>
              <Appbar />
              <Toast />
              <div className="baseDiv">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/about" exact component={AboutAllStore} />
                  <Route path="/settings" exact component={AboutAllStore} />
                  <Route path="/feedback" exact component={AboutAllStore} />

                  <Route path="/app-details" exact component={AppDetails} />
                  <Route path="/all-apps" exact component={AllApps} />
                  <Route path="/top-charts" exact component={AllApps} />

                  <Route path="/categories" exact component={AllApps} />

                  <Route path="/reviews" exact component={ReviewList} />

                  <Route path="/user" exact component={UserPage} />
                  <Route path="/my-apps" exact component={ThisDevice} />
                  <Route path="/wishlist" exact component={ThisDevice} />
                  <Route path="/logout" exact component={UserLogout} />
                  <Route path="/device" exact component={ThisDevice} />

                  <Route path="/" component={Page404} />
                </Switch>
              </div>
              <Footer />
            </BrowserRouter>
          </ProgressContext.Provider>
        </ToastContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
