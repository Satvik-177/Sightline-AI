import { Schema, model } from "mongoose";

interface IRevokedToken {
  jti: string;
  expiresAt: Date;
}

const revokedTokenSchema = new Schema<IRevokedToken>(
  {
    jti: {
      type: String,
      required: true,
      unique: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
  },
  { timestamps: true }
);

export const RevokedToken = model<IRevokedToken>(
  "RevokedToken",
  revokedTokenSchema
);