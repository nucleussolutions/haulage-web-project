var mongoose = require('mongoose');
require('mongoose-big-decimal')(mongoose);
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name : {
        type: String
    },
    price: { type: mongoose.Schema.Types.BigDecimal },

    criteria: {
        //number of prime movers to accommodate
        minPrimeMover:     { type: Number },
        maxPrimeMover:     { type: Number },
        pricePerMove : {
            type: mongoose.Schema.Types.BigDecimal
        }
    },

    discountPercentage : {
        type: Number
    }
});

module.exports = mongoose.model('Product', ProductSchema);