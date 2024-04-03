const mongoose = require('mongoose');

const eliteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    number: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    picture: {
        uri: String,
        public_id: String,
    },
    password: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false
    },
    job: {
        type: String,
    },
    verificationToken: String,
    address: [{
        name: String,
        mobileNo: String,
        houseNo: String,
        street: String,
        landmark: String,
        city: String,
        country: String,
        postalCode: String
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Elite= mongoose.model("Elite", eliteSchema);
module.exports = Elite;
