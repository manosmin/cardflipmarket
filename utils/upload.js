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
        console.log("Importing OracleCardPrices data");

        const bulkOps = [];

        for (const item of jsonData) {
            const { mtgo_id, prices } = item;

            // get the existing record if it exists
            const existingRecord = await OracleCardPrices.findOne({ mtgo_id });

            if (existingRecord) {
                // calculate the next key for prices
                const nextKey = getNextKey(existingRecord.prices);
                
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
        console.log("Importing OracleCard data");

        // create an array of bulk operations
        const bulkOps = jsonData.map((card) => ({
            updateOne: {
                filter: { mtgo_id: card.mtgo_id }, // match document by mtgo_id
                update: { $set: card }, // update the document with new data
                upsert: true, // insert if the document does not exist
            },
        }));

        // execute the bulk operations
        await OracleCard.bulkWrite(bulkOps);

        console.log("OracleCard data updated successfully");
    } catch (error) {
        console.error("Error updating OracleCard data", error);
    }
};


