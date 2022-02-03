import express from "express";
import axios from "axios";
import "dotenv/config";

const router = express();

router.get("/", async (req, res, next) => {
  try {
    let data = await axios.get(
      `${process.env.WEATHER_APP_BASE_URL}London&appid=${process.env.API_KEY}`
    );
    console.log(data);
    res.status(200).send(data.data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
