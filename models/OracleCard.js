import mongoose from 'mongoose';

const OracleCardSchema = new mongoose.Schema({
    mtgo_id: {
        type: Number,
        unique: true
    },
    name: String,
    set: String,
    rarity: String,
    image_uris: { 
        normal: String 
    },
    purchase_uris: { 
        cardmarket: String 
    }
});

const OracleCard = mongoose.model('OracleCard', OracleCardSchema, 'oracle_card');

export default OracleCard;
