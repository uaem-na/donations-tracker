import React from "react";
import "./assets/style/Main.css";
import Profile from "./components/profile/profile";
import Reset from "./components/profile/reset";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Landing from "./components/landing";
import Userfront from "@userfront/core";
import ReqOff from "./components/requestOfferPage/reqOff";
import Dashboard from "./components/dashboard";
import { Login, Register, LoginNew } from "./components/auth";
import { Layout } from "./components/layout";

Userfront.init("8nwrppdb");

function RequireAuth({ children }) {
  let location = useLocation();
  if (!Userfront.tokens.accessToken) {
    // Redirect to the /login page
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function NoAuth({ children }) {
  // let location = useLocation();
  // if (Userfront.tokens.accessToken) {
  //   // Redirect to the /dashboard page
  //   return <Navigate to="/profile" state={{ from: location }} replace />;
  // }
  return children;
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reset" element={<Reset />} />
            <Route
              path="/request/:id"
              element={<ReqOff offer={false} edit={false} />}
            />
            <Route
              path="/offer/:id"
              element={<ReqOff offer={true} edit={false} />}
            />
            <Route
              path="/new-request"
              element={<ReqOff offer={false} edit={true} />}
            />
            <Route
              path="/new-offer"
              element={<ReqOff offer={true} edit={true} />}
            />
            <Route
              path="/login"
              element={
                <NoAuth>
                  <Login />
                </NoAuth>
              }
            />
            <Route
              path="/login-new"
              element={
                <NoAuth>
                  <LoginNew />
                </NoAuth>
              }
            />
            <Route
              path="/register"
              element={
                <NoAuth>
                  <Register />
                </NoAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
