const mongoose = require("mongoose");
const Vote = require("../models/vote");
const Nominee = require("../models/nominee");
const mail_service = require('../mail_service')

async function createVote(req, res) {
    try {
        const { category_type, vote_to, user_name, email, phone_no, rating_1, rating_2, rating_3, rating_4, nominee_reason, rec_nominee, justification } = req.body;
        // Check if the user has already voted twice in this category
        const existingVotes = await Vote.find({ email, category_type });
        if (existingVotes.length >= 10) {
            return res.status(400).json({ message: "You can only vote twice per category." });
        }
        // Check if the user has already voted for this nominee in this category
        const existingNomineeVote = await Vote.findOne({ email, category_type, vote_to });
        if (existingNomineeVote) {
            return res.status(400).json({ message: "You can only vote for a nominee once per category." });
        }
        // Find the nominee and increment their vote_count by 1 if the nominee is present 
        const nominee = await Nominee.findOneAndUpdate(
            { type: category_type, name: vote_to }, // Query to find the nominee
            { $inc: { vote_count: 1 } }, // Update: increment vote_count by 1
            { new: true } // Return the updated document
        );
        // If nominee not found, return a 404 error
        if (!nominee) {
            return res.status(404).json({ message: "Nominee not found." });
        }
        // Create a new vote record
        const newVote = new Vote({
            category_type,
            vote_to,
            user_name,
            email,
            phone_no,
            rating_1,
            rating_2,
            rating_3,
            rating_4,
            nominee_reason,
            rec_nominee,
            justification
        });
        // Save the new vote to the database
        await newVote.save();
        // send the mail after the vote save in the database
        // await mail_service.sendEmail();
        // Return success response
        res.status(201).json({ message: "Vote created successfully", vote: newVote });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {createVote};