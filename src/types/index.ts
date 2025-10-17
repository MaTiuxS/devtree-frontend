export type TUser = {
  handle: string;
  name: string;
  email: string;
  _id: string;
  description: string;
  image: string;
  links: string;
};

export type RegisterForm = Pick<TUser, "handle" | "email" | "name"> & {
  password: string;
  password_confirmation: string;
};

export type LoginForm = Pick<TUser, "email"> & {
  password: string;
};

export type UserHandle = Pick<
  TUser,
  "description" | "handle" | "image" | "links" | "name"
>;

export type ProfileForm = Pick<TUser, "handle" | "description">;

export type SocialNetwork = {
  id: number;
  name: string;
  url: string;
  enabled: boolean;
};

export type DevtreeLink = Pick<SocialNetwork, "name" | "url" | "enabled">;
