import express from "express";
import cors from "cors";

// Services
import searchRouter from "./services/search/routes.js";

const server = express();
const port = process.env.PORT || 3001;

server.use(cors());
server.use(express.json());

server.use("/weather", searchRouter);

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
