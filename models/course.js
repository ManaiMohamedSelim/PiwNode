const mongoose = require('mongoose');
var ressources = require('ressources');
var tutor = require('user');

var courseSchema = new mongoose.Schema({

    title: {
        type: String
    },
    startDate :{
        type: Date
    },
    endDate :{
        type: Date
    },
    description: {
        type: String
    },
    objectives: {
        type: String
    },
    category: {
        type: String
    },
    period: {
        type: int
    },
    ressources: [ressources],
    tutorCreator: tutor
});

module.exports = mongoose.model('Course', courseSchema);