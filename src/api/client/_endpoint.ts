const API_ENDPOINTS = {
  // auth
  LOGIN: "/api/v1/auth/login",
  REGISTER: "/auth/register",
  RESET_PASSWORD: "/auth/reset-password",
  SEND_OTP: "/users/send-otp",
  VERIFY_OTP: "/users/verify-otp",

  // users
  GET_USERS: "/api/v1/admin/users",
  GET_USER: "/api/v1/admin/users/:id",
  UPDATE_USER: "/api/v1/admin/users/:id",
  DELETE_USER: "/api/v1/admin/users/:id",
  ASSIGN_PITCH_TO_USER: "/api/v1/admin/users/assign-manager-to-pitch",
 
  // pitches
  GET_PITCHES: "/api/v1/admin/pitches",
  GET_PITCH: "/api/v1/admin/pitches/:id",
  CREATE_PITCH: "/api/v1/admin/pitches",
  UPDATE_PITCH: "/api/v1/admin/pitches/:id",
  DELETE_PITCH: "/api/v1/admin/pitches/:id",
  GET_OWNER_PITCHES: "/api/v1/admin/pitches/owner/:id",
  GET_PITCH_BOOKINGS: "/api/v1/admin/pitches/bookings/:pitchId",

  // category
  GET_CATEGORIES: "/api/v1/admin/categories",
  GET_CATEGORY: "/api/v1/admin/categories/:id",
  CREATE_CATEGORY: "/api/v1/admin/categories",
  UPDATE_CATEGORY: "/api/v1/admin/categories/:id",
  DELETE_CATEGORY: "/api/v1/admin/categories/:id",

  // settings
  GET_SETTINGS: "/api/v1/admin/settings",

  // bookings
  // playpoints
  // settings
  // transactions
  // ads
  // reports/booking-history
};

export default API_ENDPOINTS;
