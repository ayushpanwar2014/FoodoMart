import express from 'express';
import { addfood, foodlist, removefood } from '../controllers/FoodController.js';
import multer from 'multer';


const FoodRouter = express.Router();

//image storage engine
const storage = multer.diskStorage({
    destination: 'upload',
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({ storage: storage });

//add food endpoint
FoodRouter.post('/addfood', upload.single('image'), addfood);

//list food endpoint
FoodRouter.get('/foodlist', foodlist);

//remove food
FoodRouter.post('/removefood', removefood);

export default FoodRouter;