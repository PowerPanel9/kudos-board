const express = require("express");
const router = express.Router();

const { 
    getAllBoards, 
    getBoardById, 
    createBoard, 
    updateBoard, 
    deleteBoard
} = require("../Controllers/boardController");
const { requireAuth } = require("../Middleware/Security");

router.get("/", getAllBoards);
router.get("/:id", getBoardById);
router.post("/", requireAuth, createBoard);
router.put("/:id", requireAuth, updateBoard);
router.delete("/:id", requireAuth, deleteBoard);

module.exports = router;