const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());

// This array acts as your live database
let booksCollection = [];

// GET Route - Formatted exactly like the reference photo
app.get('/api/v1/books', (req, res) => {
    res.status(200).json({
        status: "success",
        data: booksCollection,
        message: "Books retrieved from CenetaETL database."
    });
});

// POST Route - Maps incoming data to match the exact keys from the photo
app.post('/api/v1/books', (req, res) => {
    const { Id, Title, Author, Genre, IsAvailable, Year } = req.body;

    // Prevention check: Don't add the book if it's already in the collection
    const bookExists = booksCollection.some(b => b.id === Id);
    
    if (!bookExists) {
        // Here we build the exact structure seen in your classmate's photo
        booksCollection.push({
            id: Id,
            title: Title,
            author: Author,
            genre: Genre,
            available: IsAvailable,
            publishedYear: Year // Renames 'Year' to 'publishedYear' like the photo
        });
        res.status(201).json({ message: "Book created successfully." });
    } else {
        // If it's a duplicate, just reply with a 200 OK so your ETL app doesn't break
        res.status(200).json({ message: "Book already exists, skipping duplicate." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
