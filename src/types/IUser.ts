import { UUID } from "sequelize";

interface IUser {
  id: typeof UUID;
  username: string;
  firstname?: string;
  lastname?: string;
  password: string;
  email: string;
  phoneNumber?: string;
  proffession: string;
  description: string;
  gender: string;
  avatar?: string;
  isOnline?: boolean;
}

export default IUser;
