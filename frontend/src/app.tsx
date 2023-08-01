import { IndividualAccount } from "@pages/Register/IndividualAccount";
import { OrganizationAccount } from "@pages/Register/OrganizationAccount";
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
  EditOfferPage,
  EditRequestPage,
  FaqPage,
  GeneralPage,
  InternalServerErrorPage,
  LandingPage,
  LoginPage,
  OfferDetailsPage,
  OffersPage,
  RegisterPage,
  RequestDetailsPage,
  RequestsPage,
  ResourceNotFoundErrorPage,
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
            <Route path="/errors/404" element={<ResourceNotFoundErrorPage />} />
            <Route path="/errors/500" element={<InternalServerErrorPage />} />

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

            <Route
              path="/offers/:id/edit"
              element={
                <RequireAuth>
                  <EditOfferPage />
                </RequireAuth>
              }
            />

            <Route
              path="/requests/:id/edit"
              element={
                <RequireAuth>
                  <EditRequestPage />
                </RequireAuth>
              }
            />

            {/* Hybrid pages (public vs user might see a different view) */}
            <Route path="/requests/:id" element={<RequestDetailsPage />} />
            <Route path="/offers/:id" element={<OfferDetailsPage />} />

            {/* Authentication pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/register/individual-account"
              element={<IndividualAccount />}
            />
            <Route
              path="/register/organization-account"
              element={<OrganizationAccount />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
