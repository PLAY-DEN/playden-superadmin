import { BrowserRouter, Route, Routes } from "react-router-dom"
import DashboardPage from "./pages/dashboard"
import BaseLayout from "./layouts/base"
import AuthLayout from "./layouts/auth"
import LoginPage from "./pages/auth/login"
import PitchListing from "./pages/pitchListing"
import PitchDetails from "./pages/pitchListing/pitchDetails"
import AddNewPitch from "./components/AddNewPitch"
import BookingManagement from "./pages/bookingManagement/bookingManagement"
import BookingDetails from "./components/bookingDetails"
import CancellationManagement from "./pages/cancellation"
import CancellationDetails from "./components/cancellationDetails"
import PlaypointUsage from "./pages/playpoint/playPoints"
import Financials from "./pages/finances"
import UserManagement from "./pages/userMangement"
import UserDetails from "./components/userDetails"
import PitchAdminManagement from "./pages/pitchAdminManagement"
import AddNewAdmin from "./components/addNewAdmin"
import AdminDetails from "./components/adminDetails"
import SettingsPage from "./pages/accountSettings"

const MyRoutes = () => (
  <Routes>

    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginPage />} />
    </Route>

    <Route element={<BaseLayout />}>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/pitch-listing" element={<PitchListing />} />
      <Route path="/pitch-listing/:pitchId" element={<PitchDetails />} />
      <Route path="/add-new-pitch" element={<AddNewPitch />} />
      <Route path="/booking-management" element={<BookingManagement />} />
      <Route path="/booking-management/:id" element={<BookingDetails />} />
      <Route path="/cancellation-management" element={<CancellationManagement />} />
      <Route path="/cancellation-details/:id" element={<CancellationDetails />} />
      <Route path="/play-point" element={<PlaypointUsage />} />
      <Route path="/finances" element={<Financials />} />
      <Route path="/user-management" element={<UserManagement />} />
      <Route path="/user-management/User-details" element={<UserDetails />} />
      <Route path="/pitch-admin-management" element={<PitchAdminManagement />} />
      <Route path="/add-new-admin" element={<AddNewAdmin />} />
      <Route path="/admin-details" element={<AdminDetails />} />
      <Route path="/account-settings" element={<SettingsPage />} />
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
