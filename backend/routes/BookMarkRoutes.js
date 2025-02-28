import express from "express";
import { getBookMarks, createBookMark, updateBookMark, deleteBookMark } from "../controllers/BookMarkController.js";

const router = express.Router();

router.get("/", getBookMarks);
router.post("/", createBookMark);
router.put("/:id", updateBookMark);
router.delete("/:id", deleteBookMark);

export default router;