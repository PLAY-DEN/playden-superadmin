import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import adminReducer from "./PitchAdmin";
import adminUserReducer from "./adminSlice";
import bookingReducer from './bookingSlice';
import cancellationReducer from './cancellationSlice';
import settingsReducer from './settingsSlice';
import userReducer from './userSlice';
import bookingMgtReducer from './bookingManagementSlice';
import playpointsReducer from './playPointSlice';
import financialsReducer from './financialsSlice';
import reviewsReducer from './reviewsSlice';
import { financialReducer } from "./financialActions";
import adsMgtReducer from './adsSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        bookings: bookingReducer,
        cancellations: cancellationReducer,
        adminUser: adminUserReducer,
        financials: financialsReducer,
        settings: settingsReducer,
        users: userReducer,
        bookingMgt: bookingMgtReducer,
        playpoints: playpointsReducer,
        ratings: reviewsReducer,
        financial: financialReducer,
        adsMgt: adsMgtReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

