import OracleCard from '../models/OracleCard.js';
import OracleCardPrices from '../models/OracleCardPrices.js';

// function to append prices or insert new records
export const updateOrInsertPrices = async (jsonData, updatedAt) => {
    try {
        console.log("Importing OracleCardPrices data");

        const bulkOps = [];

        for (const item of jsonData) {
            const { mtgo_id, prices } = item;

            // get the existing record if it exists
            const existingRecord = await OracleCardPrices.findOne({ mtgo_id });

            if (existingRecord) {
                // calculate the next key for prices
                const currentKeys = Object.keys(existingRecord.prices).map(key => parseInt(key, 10));
                const nextKey = (Math.max(...currentKeys, 0) + 1).toString();

                // prepare the update operation
                bulkOps.push({
                    updateOne: {
                        filter: { mtgo_id },
                        update: {
                            $set: {
                                [`prices.${nextKey}`]: {
                                    eur: prices.eur,
                                    tix: prices.tix,
                                    date: updatedAt
                                }
                            }
                        }
                    }
                });
            } else {
                // if no existing record, insert a new document
                const newPriceEntry = {
                    '1': {
                        eur: prices.eur,
                        tix: prices.tix,
                        date: updatedAt
                    }
                };

                bulkOps.push({
                    insertOne: {
                        document: {
                            mtgo_id,
                            prices: newPriceEntry
                        }
                    }
                });
            }
        }

        // perform bulk operation
        if (bulkOps.length > 0) {
            await OracleCardPrices.bulkWrite(bulkOps);
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

