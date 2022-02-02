import express from "express";

const router = express.Router();

// Get the weather depensing on the city (5 differet cities)
// router.route("/").get(async (req, res, next) =>{ })
router.route("/").get((req, res, next) => {
    res.status(200).send("Hello World!");
});

export default router