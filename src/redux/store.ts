import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./PitchAdmin";
import bookingReducer from './bookingSlice';
import settingsReducer from './settingsSlice';
import userReducer from './userSlice';
import bookingMgtReducer from './bookingManagementSlice';
import playpointsReducer from './playPointSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        bookings: bookingReducer,
        settings: settingsReducer,
        users: userReducer,
        bookingMgt: bookingMgtReducer,
        playpoints: playpointsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

