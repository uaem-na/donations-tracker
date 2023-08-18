import { IndividualAccount } from "@pages/Register/IndividualAccount";
import { OrganizationAccount } from "@pages/Register/OrganizationAccount";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

// * Various React page components
import { UserRole } from "@constants";
import { RequireAuth } from "@features/auth";
import {
  AboutUsPage,
  AdminPostDetailsPage,
  AdminUserDetailsPage,
  AdminUsersPage,
  CreatePostPage,
  DashboardPage,
  EditPostPage,
  FaqPage,
  GeneralPage,
  InternalServerErrorPage,
  LandingPage,
  LoginPage,
  PostDetailsPage,
  PostsPage,
  RegisterPage,
  ResourceNotFoundErrorPage,
  SecurityPage,
} from "@pages";
import AdminPostsPage from "@pages/Admin/Posts";
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
            <Route path="/errors/404" element={<ResourceNotFoundErrorPage />} />
            <Route path="/errors/500" element={<InternalServerErrorPage />} />

            <Route path="/admin">
              <Route
                path="users"
                element={
                  <RequireAuth role={UserRole.ADMIN}>
                    <AdminUsersPage />
                  </RequireAuth>
                }
              />

              <Route
                path="users/:id"
                element={
                  <RequireAuth role={UserRole.ADMIN}>
                    <AdminUserDetailsPage />
                  </RequireAuth>
                }
              />

              <Route
                path="posts"
                element={
                  <RequireAuth role={UserRole.ADMIN}>
                    <AdminPostsPage />
                  </RequireAuth>
                }
              />

              <Route
                path="posts/:id"
                element={
                  <RequireAuth role={UserRole.ADMIN}>
                    <AdminPostDetailsPage />
                  </RequireAuth>
                }
              />
            </Route>

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

            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:id" element={<PostDetailsPage />} />
            <Route
              path="/posts/:type/new"
              element={
                <RequireAuth>
                  <CreatePostPage />
                </RequireAuth>
              }
            />
            <Route
              path="/posts/:id/edit"
              element={
                <RequireAuth>
                  <EditPostPage />
                </RequireAuth>
              }
            />

            {/* Hybrid pages (public vs user might see a different view) */}

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
