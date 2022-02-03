import express from "express";
import axios from "axios";
import "dotenv/config";

const router = express();
// WEATHER_APP_BASE_URL = https://api.openweathermap.org/data/2.5/weather?q=

router.get("/", async (req, res, next) => {
  try {
    let response = await axios.get(
      `${process.env.WEATHER_APP_BASE_URL}London&appid=${process.env.OPEN_WEATHER_API_KEY}`
    );
    res.status(200).send(response.data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
