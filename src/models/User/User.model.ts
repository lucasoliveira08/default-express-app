import mongoose from "mongoose";
import * as bcrypt from "bcrypt";

export const HASH_POWER = 14;

export const Schema = mongoose.Schema;

export interface IUser {
  id: string;
  _id: string;
  email: string;
  password: string;
  compareHash(hash: string): Promise<boolean>;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre<any>("save", async function () {
  if (this.password)
    return (this.password = await bcrypt.hash(this.password, HASH_POWER));
});

UserSchema.pre<any>("findOneAndUpdate", async function (next) {
  if (!this.findOneAndUpdate()._update.password) return next();

  const newPassword = this.findOneAndUpdate()._update.password;
  this.findOneAndUpdate(
    {},
    { password: await bcrypt.hash(newPassword, HASH_POWER) }
  );
  next();
});

UserSchema.methods.compareHash = async function (
  hash: string
): Promise<boolean> {
  return await bcrypt.compareSync(hash, this.password);
};

const UserModel = mongoose.model("user", UserSchema);

export default UserModel;
