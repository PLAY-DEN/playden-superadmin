import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import bookingReducer from './bookingSlice';
import settingsReducer from './settingsSlice';
import userReducer from './userSlice';
import bookingMgtReducer from './bookingManagementSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        bookings: bookingReducer,
        settings: settingsReducer,
        users: userReducer,
        bookingMgt: bookingMgtReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

