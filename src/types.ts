export interface IUser {
  USER_ID: number;
  USER_NAME: string;
}

export interface IUserPayment {
  BILL_AMT: number;
  MONTH: number;
  PAID_AMT: number;
  PAYMENTDELAY: number;
  USER_ID?: number;
  id?: number;
}

export interface IUserData {
  AGE: number;
  CREDIT_LIMIT: number;
  DID_DEFAULT_PAYMENT: number;
  EDUCATION: number;
  MARITALSTATUS: number;
  SEX: number;
  USER_ID: number;
  USER_NAME: string;
  PAYMENT_DATA: IUserPayment[];
}

export interface IGetUserDataParams {
  userId: number;
}

export interface IUserPrediction {
  PREDICTION: number;
  CONFIDENCE: number;
}
