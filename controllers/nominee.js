const mongoose = require("mongoose");
const Nominee = require("../models/nominee");

/**
 * Function to get nominees by category, with optional search by name
 * @param {*} req 
 * @param {*} res 
 */
async function getNominees(req, res) {
    try {
        const { category_type } = req.params;
        const { name } = req.query; // Query parameter for searching
        // Validate category
        const validCategories = ["fitness", "clinics", "forward_thinker", "innovations"];
        if (!validCategories.includes(category_type)) {
            return res.status(400).json({ message: "Invalid category type" });
        }
        // Build search query
        let query = { type: category_type };
        // If a name is provided, apply a case-insensitive search
        if (name && name.trim() !== "") {
            query.name = { $regex: name, $options: "i" }; // Partial match, case-insensitive
        }
        // Fetch nominees from the database
        const nominees = await Nominee.find(query);
        // Check if any nominees were found
        if (nominees.length === 0) {
            return res.status(404).json({ message: "No nominees found" });
        }
        // Return the filtered or full list of nominees
        res.status(200).json(nominees);
    } catch (error) {
        console.error("Error fetching nominees:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

/**
 * Function to create a nominee
 * @param {*} req 
 * @param {*} res 
 */
async function createNominees(req,res){
    try {
        const voters = await Nominee.insertMany(req.body); // Insert array of objects
        res.status(201).json({ message: "Voters added", voters });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    getNominees,
    createNominees,
};