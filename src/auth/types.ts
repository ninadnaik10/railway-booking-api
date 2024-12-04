export type AuthInput = {
  email: string;
  username: string;
  password?: string;
  hashedPassword?: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  email: string;
  password: string;
  username: string;
};
