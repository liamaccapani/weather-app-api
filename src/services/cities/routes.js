import axios from "axios";
import express from "express";
import "dotenv/config";

const router = express();

// SOLUTION #1
const weatherAndBusinesses = async (city) => {
  try {
    let weatherResponse = await axios.get(
      `${process.env.WEATHER_APP_BASE_URL}${city}&appid=${process.env.OPEN_WEATHER_API_KEY}`
    );

    let yelpResponse = await axios.get(
      `${process.env.YELP_BASE_URL}location=${city}&limit=5&sort_by=rating`,
      {
        headers: {
          Authorization: "Bearer " + process.env.YELP_API_KEY,
        },
      }
    );
    return { ...weatherResponse.data, ...yelpResponse.data };
  } catch (error) {
    console.log(error);
  }
};

router.get("/", async (req, res, next) => {
  try {
    const londonResults = await weatherAndBusinesses("London");
    const berlinResults = await weatherAndBusinesses("Berlin");
    const turinResults = await weatherAndBusinesses("Turin");
    const edinburghResults = await weatherAndBusinesses("Edinburgh");
    const tokyoResults = await weatherAndBusinesses("Tokyo");

    const returnValues = {
      londonResults,
      berlinResults,
      turinResults,
      edinburghResults,
      tokyoResults,
    };
    res.send(returnValues);
  } catch (error) {
    console.log(error);
    next(error);
  }
});


export default router;
