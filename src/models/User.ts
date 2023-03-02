import sequelize from "../configs/database";
import { DataTypes, Model } from "sequelize";

export default class User extends Model {
  declare id: typeof DataTypes.UUID;
  declare username: string;
  declare firstname?: string;
  declare lastname?: string;
  declare password: string;
  declare email: string;
  declare phoneNumber?: string;
  declare proffession: string;
  declare description: string;
  declare gender: string;
  declare avatar?: string;
  declare isOnline?: boolean;
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
    },
  },
  {
    modelName: "users",
    sequelize,
    timestamps: true,
  },
);
