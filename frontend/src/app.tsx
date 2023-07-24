import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// * Various React page components
import Landing from "./components/landing";
import ReqOff from "./components/requestOfferPage/reqOff";
import { Layout } from "./layout";
import { AboutUsPage, AccountPage, AdminUsersPage, FaqPage } from "./pages";

// * Individual React components that are cross-cutting concerns
import { RegisterForm } from "./features/auth/registerForm";
import { RequireAuth } from "./features/auth/requireAuth";
import { LoginPage } from "./pages/login";
import { CreatePostPage } from "./pages/posts/create";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public pages */}
            <Route index element={<Landing />} />
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

            {["/offers/new", "/requests/new"].map((path, index) => {
              return (
                <Route
                  key={index}
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
      </Router>
    </>
  );
}

export default App;
