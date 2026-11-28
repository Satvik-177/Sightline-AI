import { Schema, model } from "mongoose";

type UserRole = "user" | "admin"

interface IUser {   // For typescript
  name: string;
  email: string;
  passwordHash: string;
  role:UserRole
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

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);