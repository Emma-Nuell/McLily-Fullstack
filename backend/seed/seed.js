import mongoose from "mongoose"
import dotenv from "dotenv"
import {Product} from "../models/productModel.js"
import products from "./data/products.js"
import connectDB from "../config/database.js"

dotenv.config()



const importData = async () => { 
    try {
        console.log("connecting to db")
        await connectDB();
        console.log("updating...");
        await Product.insertMany(products)
        console.log("update successful"); 
    } catch (error) {
        console.error("Data import failed", error);
        process.exit(1)
    }
}
 
importData()
