import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import dbConnection from "./config/database.js";
import userRoute from "./Routes/userRoute.js";
import productRoute from "./Routes/productRoute.js";

dotenv.config();

const app = express();

//Middlewares
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev")); 

app.use("/api/user", userRoute);
app.use("/api/product", productRoute);

app.get("/", (req, res) => {
  res.send("Running...");
});

let PORT = 4000 || process.env.PORT;

//MongoDb connection
dbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}..🚀`);
  });
});
