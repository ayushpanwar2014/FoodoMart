import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_DATABASE_URL).then(() => console.log("MongoDB Connected"));
}

