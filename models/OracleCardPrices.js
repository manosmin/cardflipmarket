import mongoose from 'mongoose';

const PriceHistorySchema = new mongoose.Schema({
    tix: {
        type: Number
    },
    eur: {
        type: Number
    },
    date: {
        type: Date
    }
}, { _id: false });

const OracleCardPricesSchema = new mongoose.Schema({
    mtgo_id: {
        type: Number,
        unique: true
    },
    prices: {
        type: Map,
        of: PriceHistorySchema
    }
});

const OracleCardPrices = mongoose.model('OracleCardPrices', OracleCardPricesSchema, 'oracle_card_prices');

export default OracleCardPrices;
