import express, { response } from "express";
import axios from "axios";

const router = express.Router();

// Get the weather depensing on the city (5 differet cities)
router.route("/").get(async (req, res, next) => {
  try {
    let results = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=London&appid=${process.env.API_KEY}`
    );
    if (res.ok) {
      res.send(results);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
