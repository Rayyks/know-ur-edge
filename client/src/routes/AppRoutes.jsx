import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// LAYOUTS
const UserLayouts = lazy(() => import("@/layouts/UserLayouts"));

// PAGES
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const PostsPage = lazy(() => import("@/pages/PostsPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const OtherUserProfile = lazy(() => import("@/pages/OtherUserProfile"));

// SEARCH PAGE
const SearchPage = lazy(() => import("@/pages/SearchPage"));

// SUPPORT PAGES
import { NotFound } from "@/lib/404";
import PolicyPage from "@/pages/PolicyPage";

// UTILS
import PrivateRoutes from "@/routes/PrivateRoutes";

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Register" element={<RegisterPage />} />
        <Route path="/" element={<UserLayouts />}>
          <Route index element={<PostsPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="p/:id" element={<>Post Details</>} />
          <Route path="p/:id/edit" element={<>Edit Post</>} />
          {/* FOR AUTHENTICATED USER PROFILE */}
          <Route
            path="profile"
            element={
              <PrivateRoutes>
                <ProfilePage />
              </PrivateRoutes>
            }
          />
          <Route
            path="profile/edit"
            element={
              <PrivateRoutes>
                <>Edit Profile</>
              </PrivateRoutes>
            }
          />
          {/* FOR OTHER USER PROFILE */}
          <Route path="profile/:username" element={<OtherUserProfile />} />
        </Route>

        <Route path="/terms-and-conditions" element={<PolicyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
