import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/db.js";

dotenv.config({
    path: "./env"
})

const app = express();

connectDB();