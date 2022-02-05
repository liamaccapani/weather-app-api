import express from "express";
import cors from "cors";
// Services
import citiesRouter from "./services/cities/routes.js";

const server = express();
const port = process.env.PORT || 3001;

server.use(cors());
server.use(express.json());

server.use("/cities", citiesRouter);

// Error handlers

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
