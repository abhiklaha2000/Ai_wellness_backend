const mongoose = require('mongoose');
const validator = require("validator");

const nomineeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, // Name is required
        trim: true // Remove extra spaces
    },
    email: {
        type: String,
        default: "",
        lowercase: true, // Converts to lowercase before saving
        // validate: {
        //     validator: validator.isEmail,
        //     message: "Please enter a valid email address"
        // }
    }, 
    type: {
        type: String,
        required: true, // Category type is required
        trim: true
    },
    vote_count: {
        type: Number,
        default: 0, // Default value is 0
        min: 0 // Vote count cannot be negative
    },
    image_path: {
        type: String,
        default: "", // Default value is an empty string
        trim: true
    }
}, {
    timestamps: true // Adds `createdAt` and `updatedAt` fields automatically
});

// Create the Nominee model
const Nominee = mongoose.model('Nominee', nomineeSchema);

module.exports = Nominee;