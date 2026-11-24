import { Schema, model } from "mongoose";

interface IUser {   // For typescript
  name: string;
  email: string;
  passwordHash: string;
}

const userSchema = new Schema<IUser>(  //For MongoDB database
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    passwordHash: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);