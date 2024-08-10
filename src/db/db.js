import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error: ", error);
    process.exit(1); // learn more about codes
  }

}

export default connectDB;



/* another way of connecting DB in server.js (main js file)
(async () => {
    try {
        const { MONGODB_URI, PORT} = process.env;

        if (!MONGODB_URI && !DB_NAME) {
            throw new Error("Missing MONGODB_URI or DB_NAME in environment variables");
        }

        app.on("error", (error) => {
            console.log("Error: ", error);
        });

        await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);

    } catch (error) {
        console.log("Error: ", error);
        throw error;
    }
    app.listen(PORT, () => {
        console.log(`App is listening on port: ${PORT}`);
    });
})(); //IIFE (Immediately Invoked Function Expression)
*/