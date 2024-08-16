import OracleCard from '../models/OracleCard.js';
import OracleCardPrices from '../models/OracleCardPrices.js';

// function to get the next available integer key for a document
const getNextKey = (pricesMap) => {
    const keys = Array.from(pricesMap.keys()).map(Number); // Convert keys to numbers
    const maxKey = keys.length > 0 ? Math.max(...keys) : 0;
    return (maxKey + 1).toString(); // Increment max key by 1 and convert to string
};

// function to append prices or insert new records
export const updateOrInsertPrices = async (jsonData, updatedAt) => {
    try {
        console.log("Importing OracleCardPrices data")
        for (const item of jsonData) {
            const { mtgo_id, prices } = item;

            // find existing record by mtgo_id
            const existingRecord = await OracleCardPrices.findOne({ mtgo_id });

            if (existingRecord) {
                // get the next key for the prices map
                const nextKey = getNextKey(existingRecord.prices);

                // append new price entry with the calculated key
                existingRecord.prices.set(nextKey, {
                    eur: prices.eur,
                    tix: prices.tix,
                    date: updatedAt // use the updatedAt from the API response
                });

                await existingRecord.save();
            } else {
                // if no record exists, start with key '1'
                const newPriceEntry = {
                    '1': {
                        eur: prices.eur,
                        tix: prices.tix,
                        date: updatedAt // use the updatedAt date from the API response
                    }
                };

                // insert new record
                const newRecord = new OracleCardPrices({
                    mtgo_id,
                    prices: newPriceEntry
                });

                await newRecord.save();
            }
        }
        console.log("OracleCardPrices data updated successfully");

    } catch (error) {
        console.error("Error updating OracleCardPrices data:", error);
    }
};

export const updateOrInsertCards = async (jsonData) => {
    try {
        console.log("Importing OracleCard data")
        await OracleCard.insertMany(jsonData, {ordered: false});
        console.log("OracleCard data inserted successfully");
    } catch (error) {
        console.error("Error inserting OracleCard data", error);
    }
};

