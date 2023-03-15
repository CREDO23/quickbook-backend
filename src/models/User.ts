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
  declare is_online?: boolean;
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
    gender: {
      type: DataTypes.STRING,
    },
    is_online: {
      type: DataTypes.BOOLEAN,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
  },
  {
    modelName: "users",
    sequelize,
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
);
