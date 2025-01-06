import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./hooks/ProtectedRoute";
import DashboardPage from "./pages/dashboard";
import BaseLayout from "./layouts/base";
import AuthLayout from "./layouts/auth";
import LoginPage from "./pages/auth/login";
import PitchListing from "./pages/pitchListing";
import PitchDetails from "./pages/pitchListing/pitchDetails";
import AddNewPitch from "./components/pitch/AddNewPitch";
import BookingManagement from "./pages/bookingManagement/bookingManagement";
import CancellationManagement from "./pages/cancellation";
import CancellationDetails from "./components/cancellationDetails";
import PlaypointUsage from "./pages/playpoint/playPoints";
import Financials from "./pages/finances";
import UserManagement from "./pages/userMangement";
import UserDetails from "./pages/userMangement/userDetails";
import PitchAdminManagement from "./pages/pitchAdminManagement";
import AddNewAdmin from "./components/addNewAdmin";
import AdminDetails from "./pages/pitchAdminManagement/adminDetails";
import SettingsPage from "./pages/accountSettings";
import UpdatePitch from "./components/pitch/updatePitch";
import BookingDetails from "./pages/bookingManagement/bookingDetails";

const MyRoutes = () => (
  <Routes>
    {/* Authentication Layout for Login */}
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginPage />} />
    </Route>

    {/* Base Layout for all authenticated routes */}
    <Route element={<BaseLayout />}>
      {/* Protected routes wrapped with ProtectedRoute */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pitch-listing"
        element={
          <ProtectedRoute>
            <PitchListing />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pitch-listing/:pitchId"
        element={
          <ProtectedRoute>
            <PitchDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-new-pitch"
        element={
          <ProtectedRoute>
            <AddNewPitch />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking-management"
        element={
          <ProtectedRoute>
            <BookingManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking-management/:id"
        element={
          <ProtectedRoute>
            <BookingDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cancellation-management"
        element={
          <ProtectedRoute>
            <CancellationManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cancellation-details/:id"
        element={
          <ProtectedRoute>
            <CancellationDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/play-point"
        element={
          <ProtectedRoute>
            <PlaypointUsage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/finances"
        element={
          <ProtectedRoute>
            <Financials />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-management"
        element={
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user-management/User-details/:id"
        element={
          <ProtectedRoute>
            <UserDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pitch-admin-management"
        element={
          <ProtectedRoute>
            <PitchAdminManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pitch-admin-management/:id"
        element={
          <ProtectedRoute>
            <AdminDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/add-new-admin"
        element={
          <ProtectedRoute>
            <AddNewAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account-settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/update-pitch/:pitchId"
        element={
          <ProtectedRoute>
            <UpdatePitch />
          </ProtectedRoute>
        }
      />
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
