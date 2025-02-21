const mongoose = require("mongoose");
const Nominee = require("../models/nominee");

/**
 * Function to get all nominee list with respect to type
 * @param {*} req 
 * @param {*} res 
 */
async function getAllNominees(req, res) {
    try {
        const {category_type} = req.params;
        // check if the category type must in any of that [fitness,clinics,forword_thinkers,innovations]
        if(!["fitness","clinics","forward_thinker","innovations"].includes(category_type)){
            return res.status(400).json({ message: "Invalid category type" });
        }
         // Query the database for nominees with the specified category_type
         const nominees = await Nominee.find({ type: category_type });
         // Check if any nominees were found
         if (nominees.length === 0) {
             return res.status(404).json({ message: "No nominees found for the specified category type" });
         }
         // Return the list of nominees
         res.status(200).json(nominees);
    } catch (err) {
        console.error(err);
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

/**
 * Function to get a nominee by searching
 * @param {*} req 
 * @param {*} res 
 */
async function getNomineesBySearch(req, res) {
    try {
        const { category_type, name } = req.params; // Extract category from URL params
        // const { name } = req.query; // Extract search query from request
        // Validate category type
        const validCategories = ["fitness", "clinics", "forward_thinker", "innovations"];
        if (!validCategories.includes(category_type)) {
            return res.status(400).json({ message: "Invalid category type" });
        }
        // Build search query
        let query = { type: category_type }; // Filter by category
        // If a name is provided, perform a case-insensitive search
        if (name) {
            query.name = { $regex: name, $options: "i" }; // "i" makes it case-insensitive
        }
        // Fetch matching nominees
        const nominees = await Nominee.find(query);

        console.log("nominees---", nominees)
        // Check if nominees exist
        if (nominees.length === 0) {
            return res.status(404).json({ message: "No nominees found" });
        }
        // Return the nominees
        res.status(200).json(nominees);
    } catch (error) {
        console.error("Error fetching nominees:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}



module.exports = {
    getAllNominees,
    createNominees,
    getNomineesBySearch
};