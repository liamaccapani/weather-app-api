import express, { response } from "express";
import axios from "axios";

const router = express.Router();

// Get the weather depensing on the city (5 differet cities)
router.route("/").get(async (req, res, next) => {
  try {
    let results = await axios.get(
      `api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=${process.env.API_KEY}`
    );
    if (res.ok) {
      const data = await results.data;
      res.send(data);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
