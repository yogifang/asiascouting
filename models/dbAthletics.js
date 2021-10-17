const mongoose = require('mongoose');
const BestEvent = {
    item: '',
    season: '',
    score1: {
        min: 0,
        sec: 0,
        hud: 0,
        points: 0,
        cm: 0,
    },
    date1: { type: Date, default: Date.now },
    score2: {
        min: 0,
        sec: 0,
        hud: 0,
        points: 0,
        cm: 0,
    },
    date2: { type: Date, default: Date.now },
};



const schemaAthleticsPerformances = new mongoose.Schema({
    member: String,
    event1: BestEvent,
    event2: BestEvent,
    event3: BestEvent,
    event4: BestEvent,
    event5: BestEvent,
    event6: BestEvent,
    bFilled: Boolean,
});

module.exports = mongoose.models.athleticsPerformances || mongoose.model('athleticsPerformances', schemaAthleticsPerformances);
