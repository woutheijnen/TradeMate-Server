import dotenv from "dotenv";
dotenv.config();

export const mongoURI = process.env.MONGO_URI;
export const passportSecretKey = process.env.PASSPORT_SECRETKEY;
