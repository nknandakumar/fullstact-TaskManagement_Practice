import db from "../config/db.js";
db.connect();
export const getBookMarks = async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM bookmark ORDER BY created_date DESC");
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong. Please try again" });
    }
};

export const getBookMark = async (req,res)=>{
    const {id} = req.params;
    console.log(id);
    
    try {
        const response = await db.query("SELECT * FROM bookmark WHERE id = $1",[id])
        res.status(201).json(response.rows[0])
    } catch (error) {
        res.status(500).json({ error: "Something went wrong. Please try again" });
    }
}
export const createBookMark = async (req, res) => {
    const {title, url, category} = req.body;
    try {
        const response = await db.query("INSERT INTO bookmark (title, url, category) VALUES ($1, $2, $3) RETURNING *", [title, url, category]);
        res.status(201).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong. Please try again" });
    }
};
export const updateBookMark = async (req, res) => {
    const id = req.params.id;
    const {title, url, category} = req.body;
    try {
        const response = await db.query("UPDATE bookmark SET title = $1, url = $2, category = $3 WHERE id = $4 RETURNING *", [title, url, category, id]);
        res.status(200).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong. Please try again" });
    }
};
export const deleteBookMark = async (req, res) => {
    const id = req.params.id;
    try {
        await db.query("DELETE FROM bookmark WHERE id = $1", [id]);
        res.status(200).json({ message: "Bookmark was deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong. Please try again" });
    }
};