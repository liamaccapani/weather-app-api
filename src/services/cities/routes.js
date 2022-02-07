import axios from "axios";
import express from "express";
import "dotenv/config";

const router = express();

router.get("/", async (req, res, next) => {
  try {
    const cities = ["London", "Berlin", "Tokyo", "Ferrara", "Oslo"];
    const results = {}
    await Promise.all(cities.map(async (city) => {
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
      results[`${city}`] = {...weatherResponse.data,...yelpResponse.data}
      
    }))
    res.send(results)
  } catch (error) {}
});

// const weatherAndBusinesses = async (city) => {
//   try {
//     let weatherResponse = await axios.get(
//       `${process.env.WEATHER_APP_BASE_URL}${city}&appid=${process.env.OPEN_WEATHER_API_KEY}`
//     );

//     let yelpResponse = await axios.get(
//       `${process.env.YELP_BASE_URL}location=${city}&limit=5&sort_by=rating`,
//       {
//         headers: {
//           Authorization: "Bearer " + process.env.YELP_API_KEY,
//         },
//       }
//     );
//     let weather = weatherResponse.data;
//     let yelp = yelpResponse.data;
//     return { ...weather, ...yelp };
//   } catch (error) {
//     console.log(error);
//   }
// };

// router.get("/:city", async (req, res, next) => {
//   try {
//     let weatherResponse = await axios.get(
//       `${process.env.WEATHER_APP_BASE_URL}${req.params.city}&appid=${process.env.OPEN_WEATHER_API_KEY}`
//     );

//     let yelpResponse = await axios.get(
//       `${process.env.YELP_BASE_URL}location=${req.params.city}&limit=5&sort_by=rating`,
//       {
//         headers: {
//           Authorization: "Bearer " + process.env.YELP_API_KEY,
//         },
//       }
//     );
//     // let weather = weatherResponse.data;
//     // let yelp = yelpResponse.data;
//     res.status(200).send({ ...weatherResponse.data, ...yelpResponse.data });
//     // return { ...weather, ...yelp };
//   } catch (error) {
//     console.log(error);
//   }
//   // try {
//   //   const berlinResults = await weatherAndBusinesses("Berlin");
//   //   const edinburghResults = await weatherAndBusinesses("Edinburgh");
//   //   const londonResults = await weatherAndBusinesses("London");
//   //   const tokyoResults = await weatherAndBusinesses("Tokyo");
//   //   const turinResults = await weatherAndBusinesses("Turin");

//   //   const returnValues = {
//   //     berlinResults,
//   //     edinburghResults,
//   //     londonResults,
//   //     tokyoResults,
//   //     turinResults
//   //   };

//   // } catch (error) {
//   //   console.log(error);
//   //   next(error);
//   // }
// });

export default router;
