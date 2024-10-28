import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import BaseLayout from "./layouts/base";
import AuthLayout from "./layouts/auth";
import LoginPage from "./pages/auth/login";

const MyRoutes = () => (
  <Routes>

    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginPage />} />
    </Route>

    <Route element={<BaseLayout />}>
      <Route path="/" element={<DashboardPage />} />
      {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
    </Route>


  </Routes>
);

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  );
};

export default AppRoutes;
