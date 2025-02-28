import db from "../config/db.js";
db.connect();
export const getTodos = async (req, res) => {
    try {
        const response = await db.query("SELECT * FROM todo ORDER BY created_date DESC");
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong. Please try again" });
    }
};
export const createTodo = async (req, res) => {
    const {task , priority, category} = req.body;
    try {
        const response = await db.query("INSERT INTO todo (task,  priority_category,  type_category ) VALUES ($1, $2, $3) RETURNING *", [task, priority, category]);
        res.status(201).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong. Please try again" });
    }
};
export const updateTodo = async (req, res) => {
    const id = req.params.id;
    const {task , priority, category} = req.body;
    try {
        const response = await db.query("UPDATE todo SET task = $1, priority_category = $2, type_category = $3 WHERE id = $4 RETURNING *", [task, priority, category, id]);
        res.status(200).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong. Please try again" });
    }
};
export const deleteTodo = async (req, res) => {
    const id = req.params.id;
    try {
        await db.query("DELETE FROM todo WHERE id = $1", [id]);
        res.status(200).json({ message: "Todo was deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong. Please try again" });
    }
};