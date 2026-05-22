import "dotenv/config";
import express from "express";
import cors from "cors";
import mainRouter from "../index";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", mainRouter);

export default app;
