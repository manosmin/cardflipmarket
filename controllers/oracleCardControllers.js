import OracleCardPrices from '../models/OracleCardPrices.js';

const priceThreshold = 0.15;
const percentageThreshold = 25;

const timeRanges = {
    'today': 2,
    '3-days': 3,
    'weekly': 7,
    '15-days': 15
};

export const getScryfallData = async (req, res) => {
    const { range } = req.query; // get the time range from query parameters
    const dataRange = timeRanges[range] || timeRanges['today']; // default to 'today'
    
    try {
        const data = await OracleCardPrices.aggregate([
            {
                $project: {
                    mtgo_id: 1,
                    // get the keys of the prices object, sort them, and get the last two
                    prices_keys: { $objectToArray: "$prices" }
                }
            },
            {
                $project: {
                    mtgo_id: 1,
                    prices_keys: {
                        $map: {
                            input: { $slice: [{ $reverseArray: "$prices_keys" }, dataRange] }, // get last two elements
                            as: "price",
                            in: "$$price.v.tix" // extract 'tix' values for the two latest entries
                        }
                    }
                }
            },
            {
                $project: {
                    mtgo_id: 1,
                    after_tix: { $arrayElemAt: ["$prices_keys", 0] }, // the newest price (last key)
                    before_tix: { $arrayElemAt: ["$prices_keys", dataRange-1] } // the second newest price (second to last key)
                }
            },
            {
                $project: {
                    mtgo_id: 1,
                    after_tix: 1,
                    before_tix: 1,
                    percentage_difference: {
                        $cond: [
                            { $ne: ["$before_tix", 0] }, // ensure before_tix is not zero
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
                    }
                }
            },
            {
                $match: {
                    after_tix: { $gte: priceThreshold },
                    before_tix: { $exists: true },
                    percentage_difference: { $gte: percentageThreshold } // filter out results with less than a threshold
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
                    percentage_difference: 1
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

        // create an array to hold the tix prices along with their dates
        const tixPriceHistory = [];

        // loop through the prices map and extract tix prices with their corresponding dates
        for (const [date, value] of cardPrices.prices) {
            tixPriceHistory.push({
                date: value.date,
                tix: value.tix 
            });
        }

        // respond with an object containing mtgo_id and the tixPriceHistory array
        res.json({ mtgo_id, tixPriceHistory });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
