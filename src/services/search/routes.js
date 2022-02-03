import express from "express";
import axios from "axios";
import "dotenv/config";

const router = express();

router.get("/", async (req, res, next) => {
  try {
    let response = await axios.get(
      `${process.env.WEATHER_APP_BASE_URL}London&appid=${process.env.API_KEY}`
    );
    // console.log(response);
    res.status(200).send(response.data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
