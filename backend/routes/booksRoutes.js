const express = require("express");
const router = express.Router();
const bookModel = require("../models/booksModel");

// Add a new book
router.post("/add", async (req, res) => {
    try {
        const newBook = new bookModel(req.body);
        await newBook.save();
        res.status(200).json({ message: "Book Added Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Fetch all books
router.get("/getBooks", async (req, res) => {
    try {
        const books = await bookModel.find();
        res.status(200).json({ books });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Fetch a single book by ID
router.get("/getBooks/:id", async (req, res) => {
    try {
        const book = await bookModel.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update a book by ID
router.put("/updateBook/:id", async (req, res) => {
    try {
        const updatedBook = await bookModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return updated book
        );
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book Updated Successfully", updatedBook });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete a book by ID
router.delete("/deleteBook/:id", async (req, res) => {
    try {
        const deletedBook = await bookModel.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book Deleted Successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
