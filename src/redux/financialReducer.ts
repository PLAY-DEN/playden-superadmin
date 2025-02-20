// import { FETCH_FINANCIAL_STATISTICS_FAILURE, FETCH_FINANCIAL_STATISTICS_REQUEST, FETCH_FINANCIAL_STATISTICS_SUCCESS } from "../types/financialActionTypes";

  
//   interface FinancialState {
//     loading: boolean;
//     data: any;
//     error: string | null;
//   }
  
//   const initialState: FinancialState = {
//     loading: false,
//     data: null,
//     error: null,
//   };
  
//   const financialReducer = (state = initialState, action: any) => {
//     switch (action.type) {
//       case FETCH_FINANCIAL_STATISTICS_REQUEST:
//         return {
//           ...state,
//           loading: true,
//           error: null,
//         };
//       case FETCH_FINANCIAL_STATISTICS_SUCCESS:
//         return {
//           ...state,
//           loading: false,
//           data: action.payload,
//           error: null,
//         };
//       case FETCH_FINANCIAL_STATISTICS_FAILURE:
//         return {
//           ...state,
//           loading: false,
//           error: action.payload,
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default financialReducer;