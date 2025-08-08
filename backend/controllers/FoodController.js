import NodeCache from 'node-cache';
import foodModel from '../model/FoodModel.js';
import fs from 'fs';

//for making api 10x fast
const nodeCache = new NodeCache();

//add food item
export const addfood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    })

    try {
        await food.save();
        res.status(200).json({ success: true, message: 'Food Added' });
        nodeCache.del('food_list');

    } catch (error) {

        console.log(error)
        res.status(400).json({ success: false, message: "Not Added Food" });
    }

}

//remove food item
export const removefood = async (req, res) => {

    try {

        const fooditem = await foodModel.findById(req.body.id);

        fs.unlink(`./upload/${fooditem.image}`, () => { });

        await foodModel.findByIdAndDelete(req.body.id);

        nodeCache.del('food_list')

        res.status(200).json({ success: true, message: "Food item is removed" });

    } catch (error) {
        console.log(error)
        res.status(2400).json({ success: false, message: "Food item is not removed" });
    }
}

//all food item
export const foodlist = async (req, res) => {

    try {

        let foodlist;

        if (nodeCache.has('food_list')) {
            foodlist = JSON.parse(nodeCache.get('food_list'));
        }
        else {

            foodlist = await foodModel.find({});
            nodeCache.set('food_list', JSON.stringify(foodlist))

        }


        res.status(200).json({ success: true, data: foodlist });

    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: "Couldn't fetch food list!" });

    }

}



