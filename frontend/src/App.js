import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/style/Main.css";
import { AuthProvider } from "./components/auth";
import Landing from "./components/landing";
import { Layout } from "./components/layout";
import ReqOff from "./components/requestOfferPage/reqOff";
import { AboutUsPage, AccountPage, FaqPage } from "./pages";

import { LoginForm } from "./features/auth/loginForm";
import { RegisterForm } from "./features/auth/registerForm";
import { RequireAuth } from "./features/auth/requireAuth";

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
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />

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
