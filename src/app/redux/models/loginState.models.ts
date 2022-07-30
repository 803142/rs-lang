import { IUser } from './user.models';

export interface ILoginState {
  isAuthenticated: boolean;
  user: IUser | null;
  errorMessage: string | null;
}
