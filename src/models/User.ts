import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
userSchema.index({ email: 1 }, { unique: true }); //  email is indexed and unique

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
