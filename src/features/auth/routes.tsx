import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

export const authRoutes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
];
