import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// * Various React page components
import { RequireAuth } from "@features/auth";
import {
  AboutUsPage,
  AccountPage,
  AdminUsersPage,
  CreatePostPage,
  FaqPage,
  LandingPage,
  LoginPage,
  RegisterPage,
  ReqOffPage,
} from "@pages";
import { Layout } from "layout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public pages */}
            <Route index element={<LandingPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/faq" element={<FaqPage />} />

            {/* Admin pages */}
            <Route path="/admin/users" element={<AdminUsersPage />} />

            {/* Private pages */}
            <Route
              path="/account"
              element={
                <RequireAuth>
                  <AccountPage />
                </RequireAuth>
              }
            />

            {["/offers/new", "/requests/new"].map((path) => {
              return (
                <Route
                  key={path}
                  path={path}
                  element={
                    <RequireAuth>
                      <CreatePostPage />
                    </RequireAuth>
                  }
                />
              );
            })}

            {/* Authentication pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Others */}
            <Route
              path="/request/:id"
              element={<ReqOffPage offer={false} edit={false} />}
            />
            <Route
              path="/offer/:id"
              element={<ReqOffPage offer={true} edit={false} />}
            />
            <Route
              path="/new-request"
              element={
                <RequireAuth>
                  <ReqOffPage offer={false} edit={true} />
                </RequireAuth>
              }
            />
            <Route
              path="/new-offer"
              element={
                <RequireAuth>
                  <ReqOffPage offer={true} edit={true} />
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
