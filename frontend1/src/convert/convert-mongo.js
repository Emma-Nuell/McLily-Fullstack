// const fs = require("fs");
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadMongoData = () => {
    try {
        const rawData = readFileSync(
          path.join(__dirname, "mclily.products.json"),
          "utf8"
        ); 
        return JSON.parse(rawData)
    } catch (error) {
        console.error("Error loading MongoDB export file:", error);
        process.exit(1);
    }
}

const convertId = (idObj) => idObj?.$oid || idObj;
const convertDate = (dateObj) => dateObj?.$date || dateObj;

const convertSizes = (sizes) => {
  if (!Array.isArray(sizes)) return [];
  return sizes.map((size) => ({
    ...size,
    _id: convertId(size._id),
  }));
};


const convertReviews = (reviews) => {
  if (!Array.isArray(reviews)) return [];
  return reviews.map((review) => ({
    ...review,
    _id: convertId(review._id),
    date: convertDate(review.date),
  }));
};

const convertMongoItem = (item) => {
  return {
    ...item,
    _id: convertId(item._id),
    sizes: convertSizes(item.sizes),
    reviews: convertReviews(item.reviews),
    createdAt: convertDate(item.createdAt),
    updatedAt: convertDate(item.updatedAt),
  };
};

const convertAndSave = () => {
    const mongoData = loadMongoData()
    const convertedData = mongoData.map(convertMongoItem);
    
    writeFileSync(
      path.join(__dirname, "products1.js"),
      JSON.stringify(convertedData, null, 2)
    );

console.log(`Converted ${convertedData.length} products successfully`);

}

convertAndSave()


// const mongoData = require("./mclily.products.json");





