const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

let databaseBooks = [];

app.use(express.json()); 

// 1. To view the data in your browser
app.get('/api/v1/books', (req, res) => {
    res.json({
        status: "success",
        data: databaseBooks,
        message: "Books retrieved from CenetaETL database."
    });
});

// 2. Used by your C# app to upload books
app.post('/api/v1/books', (req, res) => {
    databaseBooks.push(req.body);
    res.status(201).json({ message: "Book added!" });
});

// 3. Used by your C# app to clear the data
app.delete('/api/v1/books', (req, res) => {
    databaseBooks = [];
    res.json({ message: "Library reset." });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));