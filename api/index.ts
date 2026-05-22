import "dotenv/config";
import express from "express";
import mainRouter from "../index.js";

const app = express();

app.use(express.json());
app.use("/", mainRouter);

export default app;
