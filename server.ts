import "dotenv/config";
import express from "express";
import mainRouter from "./index";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
