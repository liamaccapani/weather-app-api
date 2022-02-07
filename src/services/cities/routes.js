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
    const berlin = await weatherAndBusinesses("Berlin");
    const edinburgh = await weatherAndBusinesses("Edinburgh");
    const london = await weatherAndBusinesses("London");
    const tokyo = await weatherAndBusinesses("Tokyo");
    const turin = await weatherAndBusinesses("Turin");

    const returnValues = {
      berlin,
      edinburgh,
      london,
      tokyo,
      turin,
    };
    res.send(returnValues);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// SOLUTION #2
router.get("/", async (req, res, next) => {
  const cities = ["Berlin", "Edinburgh", "London", "Tokyo", "Turin"];
  let results = {};
  await Promise.all(
    cities.map(async (city) => {
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
        results[`${city}`] = { ...weatherResponse.data, ...yelpResponse.data };
      } catch (error) {
        console.log(error);
      }
    })
  );
  res.send(results);
});

export default router;
