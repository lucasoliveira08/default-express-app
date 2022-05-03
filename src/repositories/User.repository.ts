import { User } from "@prisma/client";
import prisma from "../config/db/Postgre";
import UserModel, { IUser } from "../models/User/User.model";

export interface ICreateUser {
  email: string;
  password: string;
}

export interface IFindUser {
  email?: string;
  _id?: string;
}

class UserMongoRepository {
  model = UserModel;

  public async create(data: ICreateUser): Promise<IUser> {
    const user = await this.model.create({
      ...data,
    });

    if (!user._id) throw new Error("User not created");

    return user;
  }

  public async findOne(data: IFindUser): Promise<IUser> {
    const user = await this.model.findOne({
      ...data,
    });

    if (!user._id) throw new Error("User not found");

    return user;
  }
}

export const UserMongo = new UserMongoRepository();

class UserPostgreRepository {
  public async create(data: ICreateUser): Promise<User> {
    return await prisma.user.create({
      data: {
        ...data,
      },
    });
  }

  public async findOne(data: IFindUser): Promise<User> {
    return await prisma.user.findFirst({
      where: {
        ...data,
      },
    });
  }
}

export const UserPostgre = new UserPostgreRepository();
