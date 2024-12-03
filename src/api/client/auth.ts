import { ApiClient } from ".";
import API_ENDPOINTS from "./_endpoint";
import { IResponse } from "../../types/client";
import { ILoginPayload, ILoginResponse } from "../../types/auth";

const authClient = {
  login: async (data: ILoginPayload): Promise<IResponse<ILoginResponse>> =>
    ApiClient.post(API_ENDPOINTS.LOGIN, data),
//   register: async (data: IRegisterPayload): Promise<IResponse<any>> =>
//     ApiClient.post(API_ENDPOINTS.REGISTER, data),
//   resetPassword: async (data: IResetPasswordPayload): Promise<IResponse<any>> =>
//     ApiClient.post(API_ENDPOINTS.RESET_PASSWORD, data),
//   verifyOtp: async (data: IVerifyOtpPayload): Promise<any> =>
//     ApiClient.post(API_ENDPOINTS.VERIFY_OTP, data),
//   sendOtp: async (data: ISendOtpPayload): Promise<any> =>
//     ApiClient.post(API_ENDPOINTS.SEND_OTP, data),
};

export default authClient;
