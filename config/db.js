import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database is connected sucessfully.`);
    } catch (error) {
        console.log(error);
    }
}

export {connectDB}