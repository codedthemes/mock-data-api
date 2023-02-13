import express from "express";
import * as dotenv from "dotenv";
import * as bodyparser from "body-parser";
import cors from "cors";
import router from "./routes";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 4000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is up and runnig on ${PORT}`);
});
