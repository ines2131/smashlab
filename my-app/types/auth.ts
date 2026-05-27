export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export type AuthFormData = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};
