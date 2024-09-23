const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");
const app = express();
path.resolve();

app.use(cors());
app.use(express.json());

const port = 5000;
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud",
});

// Fetch all students
app.get("/", (req, res) => {
    const sql = "SELECT * FROM studentdata";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error querying database:", err);
            return res.json({ Message: "Error inside server" });
        }
        return res.json(result);
    });
});

// POST a new student
app.post("/students", (req, res) => {
    const { firstname, lastname, age, dob, location } = req.body;
    const sql = "INSERT INTO studentdata (firstname, lastname, age, dob, location) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [firstname, lastname, age, dob, location], (err, result) => {
        if (err) {
            console.error("Error creating student:", err);
            return res.status(500).json({ error: "Error creating student" });
        }
        return res.status(200).json({ message: "Student created successfully" });
    });
});

// Read a student by ID
app.get("/read/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM studentdata WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error querying the database:", err);
            return res.status(500).json({ Message: "Error inside server" });
        }
        return res.status(200).json(result);
    });
});

// Update a student by ID
app.put("/edit_user/:id", (req, res) => {
    const sql = "UPDATE studentdata SET firstname = ?, lastname = ?, age = ?, dob = ?, location = ? WHERE id = ?";
    const id = req.params.id;
    const { firstname, lastname, age, dob, location } = req.body;
    db.query(sql, [firstname, lastname, age, dob, location, id], (err, result) => {
        if (err) {
            console.error("Error updating student:", err);
            return res.status(500).json({ error: "Error updating student" });
        }
        return res.status(200).json({ message: "Student updated successfully" });
    });
});

// Delete a student by ID
app.delete("/delete/:id", (req, res) => {
    const sql = "DELETE FROM studentdata WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error deleting student:", err);
            return res.status(500).json({ error: "Error deleting student" });
        }
        return res.status(200).json({ message: "Student deleted successfully" });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
