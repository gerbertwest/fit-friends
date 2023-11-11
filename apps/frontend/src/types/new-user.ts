export type NewUser = {
  email: string;
  dateBirth: Date;
  name: string;
  password: string;
  role: string;
  sex: string;
  description: string;
  location: string;
  backgroundImage?: string;
  avatar: File | undefined;
};
