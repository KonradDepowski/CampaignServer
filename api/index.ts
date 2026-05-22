import "dotenv/config";
import express from "express";
import mainRouter from "../index";

const app = express();

app.use(express.json());
app.use("/", mainRouter);

export default app;
