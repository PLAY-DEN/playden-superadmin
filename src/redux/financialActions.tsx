// financialActions.ts

import { ThunkAction } from "redux-thunk";
import { RootState } from "../redux/store";
import { Action } from "redux";
import axios from "axios";
import {
  FETCH_FINANCIAL_STATISTICS_FAILURE,
  FETCH_FINANCIAL_STATISTICS_REQUEST,
  FETCH_FINANCIAL_STATISTICS_SUCCESS,
} from "../types/financialActionTypes";
import API_ENDPOINTS from "../api/client/_endpoint";
import { apiClient } from "../utils/apiClient";

interface FinancialState {
  loading: boolean;
  data: any;
  error: string | null;
}

const initialState: FinancialState = {
  loading: false,
  data: null,
  error: null,
};

export const financialReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_FINANCIAL_STATISTICS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_FINANCIAL_STATISTICS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case FETCH_FINANCIAL_STATISTICS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// export default financialReducer;

// Action Creators
export const fetchFinancialStatisticsRequest = () => ({
  type: FETCH_FINANCIAL_STATISTICS_REQUEST,
});

export const fetchFinancialStatisticsSuccess = (data: any) => ({
  type: FETCH_FINANCIAL_STATISTICS_SUCCESS,
  payload: data,
});

export const fetchFinancialStatisticsFailure = (error: string) => ({
  type: FETCH_FINANCIAL_STATISTICS_FAILURE,
  payload: error,
});

// Thunk Action to Fetch Financial Statistics
export const fetchFinancialStatistics = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return async (dispatch) => {
    dispatch(fetchFinancialStatisticsRequest());
    try {
      const response = await apiClient(`${API_ENDPOINTS.FINANCIAL_B}`);
      console.log(response.data);
      console.log(API_ENDPOINTS.FINANCIAL_B);
      

      dispatch(fetchFinancialStatisticsSuccess(response.data));
    } catch (error: any) {
        console.log("response");
      dispatch(fetchFinancialStatisticsFailure(error.message));
    }
  };
};
