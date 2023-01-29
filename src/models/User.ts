import sequelize from "../configs/database";
import { DataTypes, Model } from "sequelize";
import IUser from "../types/IUser";

export default class User extends Model<IUser> {
  declare username: string;
  declare id: string;
  declare email: string;
  declare password: string;
  declare firstname: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    firstname: {
      type: DataTypes.STRING,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    proffession: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    isOnline: {
      type: DataTypes.BOOLEAN,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "users",
    sequelize,
    timestamps: true,
  },
);
