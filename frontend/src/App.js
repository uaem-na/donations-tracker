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
import ReqOff from "./components/requestOfferPage/reqOff";
import Dashboard from "./components/dashboard";
import { Login, Register, AuthProvider, useAuth } from "./components/auth";
import { Layout } from "./components/layout";

const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  let location = useLocation();

  if (!user) {
    // If user is not logged in, redirect to login page with current path as redirect path
    return <Navigate to="/login" state={{ from: location.pathname }} />;
  }

  return children;
};

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
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
                element={
                  <RequireAuth>
                    <ReqOff offer={false} edit={true} />
                  </RequireAuth>
                }
              />
              <Route
                path="/new-offer"
                element={
                  <RequireAuth>
                    <ReqOff offer={true} edit={true} />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
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
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
