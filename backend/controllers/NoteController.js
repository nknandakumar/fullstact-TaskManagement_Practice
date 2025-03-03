import db from "../config/db.js";
db.connect();
export const getNotes = async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM note ORDER BY created_date DESC");
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong. Please try again" });
    }
};
export const createNote = async (req, res) => {
    const {title, content,category} = req.body;
    try {
        const response = await db.query("INSERT INTO note (title, content, category) VALUES ($1, $2, $3) RETURNING *", [title, content, category]);
        res.status(201).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong. Please try again" });
    }
};
export const updateNote = async (req, res) => {
    const id = req.params.id;
    const {title, content, category} = req.body;
    try {
        const response = await db.query("UPDATE note SET title = $1, content = $2, category = $3 WHERE id = $4 RETURNING *", [title, content, category, id]);
        res.status(200).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong. Please try again" });
    }
};
export const deleteNote = async (req, res) => {
    const id = req.params.id;
    try {
        await db.query("DELETE FROM note WHERE id = $1", [id]);
        res.status(200).json({ message: "Note was deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong. Please try again" });
    }
};