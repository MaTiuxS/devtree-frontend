export type TUser = {
  handle: string;
  name: string;
  email: string;
  password: string;
};

export type RegisterForm = Pick<TUser, "handle" | "email" | "name"> & {
  password: string;
  password_confirmation: string;
};
