export interface AuthResponse {
  user: {
    firstName: string;
    lastName: string;
  };
  accessToken: string;
  refreshToken: string;
}
