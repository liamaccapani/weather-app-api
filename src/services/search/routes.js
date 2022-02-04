import express from "express";
import axios from "axios";
import "dotenv/config";

const router = express();

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
    let weather = weatherResponse.data;
    let yelp = yelpResponse.data;
    return { ...weather, ...yelp };
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

    const returnValues = { ...londonResults };
    res.status(200).send(returnValues);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// router.get("/", async (req, res, next) => {
//   const london = "London";
//   const berlin = "Berlin";
//   const turin = "Turin";
//   const edinburgh = "Edinburgh";
//   const tokyo = "Tokyo";
//   try {
//     // LONDON
//     let weatherResponse = await axios.get(
//       `${process.env.WEATHER_APP_BASE_URL}${london}&appid=${process.env.OPEN_WEATHER_API_KEY}`
//     );

//     let yelpResponse = await axios.get(
//       `${process.env.YELP_BASE_URL}location=${london}&limit=5&sort_by=rating`,
//       {
//         headers: {
//           Authorization: "Bearer " + process.env.YELP_API_KEY
//         },
//       }
//     );
//     // The response object you get from the open weather API is circular type(objects which reference themselves).
//     // JSON.stringify will throw an error when it comes through a circular reference.
//     // This is the reason you are getting this error while using send method.
//     // That's why send(response.data)
//     let weatherLondon = weatherResponse.data;
//     let yelpLondon = yelpResponse.data;

//     const returnValues = {...weatherLondon, ...yelpLondon};
//     res.status(200).send(returnValues);
//   } catch (error) {
//     console.log(error);
//     next(error);
//   }
// });

// https://api.yelp.com/v3/businesses/search?location=London&limit=5&sort_by=rating

export default router;
