const mongoose = require('mongoose');
const schemaTennis = new mongoose.Schema({
    member: String,
    UTR: Number,
    rankSingleITF: Number,
    rankDoubleITF: Number,
    rankSingle: Number,
    rankDouble: Number,
    linkVideo1: String,
    linkVideo2: String,
    bFilled: Boolean,
});

module.exports = mongoose.models.tennis || mongoose.model('tennis', schemaTennis);
