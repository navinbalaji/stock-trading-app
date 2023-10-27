import express from "express";
import cors from "cors";
import stockMatchRouter from "./StockMatching.js";

export const stockApp = express();

stockApp.use(express.json());
stockApp.use(
  cors({
    origin: "*",
  })
);

stockApp.use("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

stockApp.use("/stock", stockMatchRouter);

const PORT = process.env.PORT || 8000;
stockApp.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});
