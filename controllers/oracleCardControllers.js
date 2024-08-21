import OracleCardPrices from '../models/OracleCardPrices.js';

const priceThreshold = 0.15;
const percentageThreshold = 25;

const timeRanges = {
    'today': 2,
    '3-days': 4,
    'weekly': 8,
    '15-days': 16
};

export const getScryfallData = async (req, res) => {
    const { range } = req.query; // get the time range from query parameters
    const dataRange = timeRanges[range] || timeRanges['today']; // default to 'today'
    
    try {
        const data = await OracleCardPrices.aggregate([
            {
                $project: {
                    mtgo_id: 1,
                    prices_keys: { $objectToArray: "$prices" }
                }
            },
            {
                $project: {
                    mtgo_id: 1,
                    prices_keys: {
                        $map: {
                            input: { $slice: [{ $reverseArray: "$prices_keys" }, dataRange] },
                            as: "price",
                            in: {
                                tix: "$$price.v.tix", // extract 'tix' values
                                eur: "$$price.v.eur"  // extract 'eur' values
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    mtgo_id: 1,
                    after_tix: { $arrayElemAt: ["$prices_keys.tix", 0] },
                    before_tix: { $arrayElemAt: ["$prices_keys.tix", dataRange-1] },
                    after_eur: { $arrayElemAt: ["$prices_keys.eur", 0] },
                    before_eur: { $arrayElemAt: ["$prices_keys.eur", dataRange-1] }
                }
            },
            {
                $project: {
                    mtgo_id: 1,
                    after_tix: 1,
                    before_tix: 1,
                    after_eur: 1,
                    before_eur: 1,
                    percentage_difference_tix: {
                        $cond: [
                            { $ne: ["$before_tix", 0] }, 
                            {
                                $multiply: [
                                    {
                                        $divide: [
                                            { $subtract: ["$after_tix", "$before_tix"] },
                                            "$before_tix"
                                        ]
                                    },
                                    100
                                ]
                            },
                            0
                        ]
                    },
                    percentage_difference_eur: {
                        $cond: [
                            { $ne: ["$before_eur", 0] }, 
                            {
                                $multiply: [
                                    {
                                        $divide: [
                                            { $subtract: ["$after_eur", "$before_eur"] },
                                            "$before_eur"
                                        ]
                                    },
                                    100
                                ]
                            },
                            0
                        ]
                    }
                }
            },
            {
                $match: {
                    after_tix: { $gte: priceThreshold },
                    before_tix: { $exists: true },
                    percentage_difference_tix: { $gte: percentageThreshold }
                }
            },
            {
                $lookup: {
                    from: "oracle_card",
                    localField: "mtgo_id",
                    foreignField: "mtgo_id",
                    as: "oracle_card_data"
                }
            },
            { $unwind: "$oracle_card_data" },
            {
                $project: {
                    mtgo_id: 1,
                    name: "$oracle_card_data.name",
                    set: "$oracle_card_data.set",
                    rarity: "$oracle_card_data.rarity",
                    cardmarket: "$oracle_card_data.purchase_uris.cardmarket",
                    image: "$oracle_card_data.image_uris.normal",
                    after_tix: 1,
                    before_tix: 1,
                    after_eur: 1,
                    before_eur: 1,
                    percentage_difference_tix: 1,
                    percentage_difference_eur: 1
                }
            }
        ]);

        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const getPriceHistoryData = async (req, res) => {
    const { mtgo_id } = req.params; // extract mtgo_id from request parameters

    try {
        // find the document by mtgo_id
        const cardPrices = await OracleCardPrices.findOne({ mtgo_id });

        if (!cardPrices) {
            return res.status(404).json({ message: 'Card not found' });
        }

        // create an array to hold the tix and eur prices along with their dates
        const priceHistory = [];

        // loop through the prices map and extract tix and eur prices with their corresponding dates
        for (const [date, value] of cardPrices.prices) {
            priceHistory.push({
                date: value.date,
                tix: value.tix,
                eur: value.eur
            });
        }

        // respond with an object containing mtgo_id and the priceHistory array
        res.json({ mtgo_id, priceHistory });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

