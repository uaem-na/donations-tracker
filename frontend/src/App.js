import React from "react";
import "./assets/style/Main.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Landing from "./components/landing";
import ReqOff from "./components/requestOfferPage/reqOff";
import { Login, Register, AuthProvider, useAuth } from "./components/auth";
import { Layout } from "./components/layout";
import { AboutUsPage, AccountPage, FaqPage } from "./pages";

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
              {/* Public pages */}
              <Route index element={<Landing />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/faq" element={<FaqPage />} />

              {/* Private pages */}
              <Route
                path="/account"
                element={
                  <RequireAuth>
                    <AccountPage />
                  </RequireAuth>
                }
              />

              {/* Authentication pages */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Others */}
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
            </Route>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
