import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express();

const { CORS_ORIGIN } = process.env;
if (!CORS_ORIGIN) {
    throw new Error("Missing CORS_ORIGIN env");
}
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
}));

app.use(express.json({
    limit: "10kb",
})); // configuration of json files

app.use(express.urlencoded({
    extended: true,
    limit: "16kb",z
})); // configuration of URL

app.use(express.static('public')); // anyone can access this file
app.use(cookieParser());