export interface IUser {
  message?: string;
  token?: string;
  refreshToken?: string;
  userId?: string;
  name?: string;
  photo?: string;
}

export interface IHttpUser {
  email: string | FormDataEntryValue;
  password: string | FormDataEntryValue;
  name?: string;
  photo?: FormDataEntryValue;
}
