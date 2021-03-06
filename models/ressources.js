const mongoose = require('mongoose');
var tutor = require('./user');

var ressourceSchema = new mongoose.Schema({

    name: {
        type: String
    },
    creationDate :{
        type: Date ,
        default: Date.now
    },
    description: {
        type: String
    },
    path: {
        type: String
    },
    tutor: {type:mongoose.Schema.Types.ObjectId,ref:'User'}
});

module.exports = mongoose.model('Ressources', ressourceSchema);
