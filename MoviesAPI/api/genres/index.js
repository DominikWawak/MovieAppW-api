import { genres } from "./genresData";
import express from "express";
import genreModel from "./genreModel";

const router = express.Router(); 
router.get('/', async (req, res) => {
    const generes = await genreModel.find();
    res.status(200).json(generes);
});



export default router;