
export interface ILoginPayload {
  userId: string;
  password: string;
}

export interface IRegisterPayload {
  firstName?: string;
  lastName?: string;
  cooperativeName?: string;
  vendorName?: string;
  email: string;
  phoneNumber: string;
  password: string;
  userType: string;
}

export interface IResetPasswordPayload {
  userId: string;
  otp: string;
  password: string;
}

export interface ILoginResponse {
  token: string;
  user: any;
}

export interface IVerifyOtpPayload {
  userId: string;
  otp: string;
  type: OtpType;
}

export enum OtpType {
  VERIFY_ACCOUNT = "verify-account",
  CHANGE_PASSWORD = "change-password",
}

export interface ISendOtpPayload {
  userId: string;
  method: string;
  type: string;
}
