import OracleCard from '../models/OracleCard.js';
import OracleCardPrices from '../models/OracleCardPrices.js';

const getNextKey = (pricesMap) => {
    const keys = Array.from(pricesMap.keys()).map(Number);
    const maxKey = keys.length > 0 ? Math.max(...keys) : 0;
    return (maxKey + 1).toString();
};

export const updateOrInsertPrices = async (jsonData, updatedAt) => {
    try {
        console.log("Importing OracleCardPrices data");

        const bulkOps = [];

        for (const item of jsonData) {
            const { mtgo_id, prices } = item;

            const existingRecord = await OracleCardPrices.findOne({ mtgo_id });

            if (existingRecord) {
                const currentPrices = existingRecord.prices;

                const pricesMap = currentPrices;

                if (pricesMap.size >= 15) {
                    const oldestKey = Math.min(...Array.from(pricesMap.keys()).map(Number));
                    pricesMap.delete(oldestKey.toString());
                }

                const nextKey = getNextKey(pricesMap);

                pricesMap.set(nextKey, {
                    eur: prices.eur,
                    tix: prices.tix,
                    date: updatedAt
                });

                bulkOps.push({
                    updateOne: {
                        filter: { mtgo_id },
                        update: {
                            prices: Object.fromEntries(pricesMap)
                        }
                    }
                });
            } else {
                const newPriceEntry = new Map();
                newPriceEntry.set('1', {
                    eur: prices.eur,
                    tix: prices.tix,
                    date: updatedAt
                });

                bulkOps.push({
                    insertOne: {
                        document: {
                            mtgo_id,
                            prices: Object.fromEntries(newPriceEntry)
                        }
                    }
                });
            }
        }

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

        const bulkOps = jsonData.map((card) => ({
            updateOne: {
                filter: { mtgo_id: card.mtgo_id },
                update: { $set: card },
                upsert: true,
            },
        }));

        await OracleCard.bulkWrite(bulkOps);

        console.log("OracleCard data updated successfully");
    } catch (error) {
        console.error("Error updating OracleCard data", error);
    }
};


