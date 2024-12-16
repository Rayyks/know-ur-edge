import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// LAYOUTS
const UserLayouts = lazy(() => import("@/layouts/UserLayouts"));

// PAGES
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const PostsPage = lazy(() => import("@/pages/PostsPage"));
const FollowingPostsPage = lazy(() => import("@/pages/FollowingPage"));
const SinglePostPage = lazy(() => import("@/pages/SinglePostPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const OtherUserProfile = lazy(() => import("@/pages/OtherUserProfile"));
const ProfileEditPage = lazy(() => import("@/pages/EditProfilePage"));
const CreatePost = lazy(() => import("@/components/post/Create-Post"));
const EditPost = lazy(() => import("@/pages/EditPost"));

// SEARCH PAGE
const SearchPage = lazy(() => import("@/pages/SearchPage"));

// SUPPORT PAGES
import { NotFound } from "@/lib/404";
import PolicyPage from "@/pages/PolicyPage";

// UTILS
import PrivateRoutes from "@/routes/PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import GuestWrapper from "@/lib/GuestWrapper";

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* PUBLIC ROUTE */}
        <Route
          path="/login"
          element={
            <PublicRoutes>
              <LoginPage />
            </PublicRoutes>
          }
        />
        <Route
          path="/Register"
          element={
            <PublicRoutes>
              <RegisterPage />
            </PublicRoutes>
          }
        />
        <Route path="/terms-and-conditions" element={<PolicyPage />} />
        <Route path="*" element={<NotFound />} />

        {/* ACCESSIBLE ROUTES FOR BOTH GUEST AND AUTH */}
        <Route path="/" element={<UserLayouts />}>
          <Route index element={<PostsPage />} />
          <Route path="following" element={<FollowingPostsPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route
            path="p/:postId"
            element={
              <GuestWrapper restrictedActions={false}>
                <SinglePostPage />
              </GuestWrapper>
            }
          />
          <Route
            path="profile/:username"
            element={
              <GuestWrapper>
                <OtherUserProfile />
              </GuestWrapper>
            }
          />

          {/* FOR AUTHENTICATED USER PROFILE */}
          <Route path="post/create" element={<CreatePost />} />
          <Route path="post/edit/:postId" element={<EditPost />} />
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
                <ProfileEditPage />
              </PrivateRoutes>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
