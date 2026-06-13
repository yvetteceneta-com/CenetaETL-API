const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

let booksCollection = [];

// GET Route - Matches the black reference photo format perfectly
app.get('/api/v1/books', (req, res) => {
    res.status(200).json({
        status: "success",
        data: booksCollection,
        message: "Books retrieved from CenetaETL database."
    });
});

// POST Route - Flexible parsing to handle C# payload structures smoothly
app.post('/api/v1/books', (req, res) => {
    // Read properties whether they start with lowercase or uppercase letters
    const id = req.body.Id !== undefined ? req.body.Id : req.body.id;
    const title = req.body.Title || req.body.title;
    const author = req.body.Author || req.body.author;
    const genre = req.body.Genre || req.body.genre;
    const available = req.body.IsAvailable !== undefined ? req.body.IsAvailable : req.body.available;
    const year = req.body.Year !== undefined ? req.body.Year : req.body.publishedYear;

    if (!id) {
        return res.status(400).json({ message: "Invalid data received: Missing ID." });
    }

    // Duplicate check
    const bookExists = booksCollection.some(b => b.id === id);
    
    if (!bookExists) {
        booksCollection.push({
            id: Number(id),
            title: title,
            author: author,
            genre: genre || "",
            available: available === true || available === 'True',
            publishedYear: Number(year)
        });
        res.status(201).json({ message: "Book created successfully." });
    } else {
        res.status(200).json({ message: "Book already exists, skipping duplicate." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});