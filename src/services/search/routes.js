import express from "express";
import axios from "axios";
import "dotenv/config";

const router = express();

router.get("/", async (req, res, next) => {
  const london = "London";
  const berlin = "Berlin";
  const turin = "Turin";
  const edinburgh = "Edinburgh";
  const tokyo = "Tokyo";
  try {
    let weather = await axios.get(
      `${process.env.WEATHER_APP_BASE_URL}${london}&appid=${process.env.OPEN_WEATHER_API_KEY}`
    );
    // The response object you get from the open weather API is circular type(objects which reference themselves). 
    // JSON.stringify will throw an error when it comes through a circular reference. 
    // This is the reason you are getting this error while using send method.
    // That's why send(response.data)
    let weatherResponse = weather.data
    res.status(200).send(weatherResponse);
  } catch (error) {
    console.log(error);
    next(error);
  }
});


// https://api.yelp.com/v3/businesses/search?location=London&limit=5&sort_by=rating

// router.get("/", async (req, res, next) => {
//   try {
//     let response = await axios.get(
//       `${process.env.WEATHER_APP_BASE_URL}London&appid=${process.env.OPEN_WEATHER_API_KEY}`
//     );
//     res.status(200).send(response.data);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

export default router;
