import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  // Add other user properties as needed
}

const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Define other user properties here
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
