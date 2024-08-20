import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

const {PORT} = process.env;
const port = PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at PORT: ${port}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection FAILED!!!", err);
  });