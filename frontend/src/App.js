import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import ProvideAuth from "./providers/auth";
import ProfileProvider from "./providers/profile.provider";
import ForgotPassword from "./routes/auth/ForgotPassword";
import Logout from "./routes/auth/Logout";
import HubRegistration from "./routes/modules/hub.registration";
import IncubateRegistration from "./routes/modules/incubate.registration";
import ProtectedRoute from "./routes/protected.route";
import UnProtectedRoute from "./routes/unprotected.route";
import UserProfileRegistration from "./routes/UserProfileRegistration";
import UserProfileView from "./routes/UserProfileView";

const Home = lazy(() => import("./routes/Home"));
const About = lazy(() => import("./routes/About"));
const Login = lazy(() => import("./routes/auth/Login"));
const SignUp = lazy(() => import("./routes/auth/SignUp"));
const UserProfile = lazy(() => import("./routes/UserProfile"));

export const App = () => (
  <ProvideAuth>
    <Router>
      <Suspense fallback={null}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/registration/hub" element={<HubRegistration />} />
              <Route
                path="/registration/incubatee"
                element={<IncubateRegistration />}
              />
              <Route element={<ProfileProvider />}>
                <Route path="/myprofile" element={<UserProfile />}>
                  <Route path="" element={<UserProfileView />} />
                  <Route
                    path="register"
                    element={<UserProfileRegistration />}
                  />
                </Route>
              </Route>
              <Route path="/auth/logout" element={<Logout />} />
            </Route>
          </Route>
          <Route element={<UnProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/about" element={<About />} />
            </Route>
          </Route>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Suspense>
    </Router>
  </ProvideAuth>
);
