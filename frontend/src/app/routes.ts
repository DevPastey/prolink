import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ExplorePage } from "./pages/ExplorePage";
import { ProfilePage } from "./pages/ProfilePage";
import { DashboardPage } from "./pages/DashboardPage";
import { NotFound } from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "explore", Component: ExplorePage },
      { path: "profile/:id", Component: ProfilePage },
      { path: "dashboard", Component: DashboardPage },
      { path: "login", Component: LoginPage },
      { path: "signup", Component: SignupPage },
      { path: "*", Component: NotFound },
    ],
  },
]);
