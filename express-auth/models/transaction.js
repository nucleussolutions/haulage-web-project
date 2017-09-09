var mongoose = require('mongoose');
require('mongoose-big-decimal')(mongoose);
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({

    userId : {
        type: String
    },
    status : {
        type: String
    }
});
