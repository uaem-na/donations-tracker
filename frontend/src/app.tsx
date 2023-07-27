import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// * Various React page components
import { UserRole } from "@constants";
import { RequireAuth } from "@features/auth";
import {
  AboutUsPage,
  AdminUsersPage,
  CreateOfferPage,
  CreateRequestPage,
  DashboardPage,
  FaqPage,
  GeneralPage,
  LandingPage,
  LoginPage,
  OffersPage,
  RegisterPage,
  ReqOffPage,
  RequestsPage,
  SecurityPage,
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
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/requests" element={<RequestsPage />} />

            {/* Admin pages */}
            <Route
              path="/admin/users"
              element={
                <RequireAuth role={UserRole.ADMIN}>
                  <AdminUsersPage />
                </RequireAuth>
              }
            />

            {/* Private pages */}
            {/* Account Pages */}
            <Route
              path="/account/dashboard"
              element={
                <RequireAuth>
                  <DashboardPage />
                </RequireAuth>
              }
            />
            <Route
              path="/account/general"
              element={
                <RequireAuth>
                  <GeneralPage />
                </RequireAuth>
              }
            />
            <Route
              path="/account/security"
              element={
                <RequireAuth>
                  <SecurityPage />
                </RequireAuth>
              }
            />

            <Route
              path="/offers/new"
              element={
                <RequireAuth>
                  <CreateOfferPage />
                </RequireAuth>
              }
            />

            <Route
              path="/requests/new"
              element={
                <RequireAuth>
                  <CreateRequestPage />
                </RequireAuth>
              }
            />

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
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
