const express = require("express");
const router = express.Router();

const { 
    getAllCards, 
    getCardById, 
    createCard, 
    updateCard, 
    deleteCard 
} = require("../Controllers/cardController");
const { requireAuth } = require("../Middleware/Security");

router.get("/", getAllCards);
router.get("/:id", getCardById);
router.post("/", requireAuth, createCard);
router.put("/:id", requireAuth, updateCard);
router.delete("/:id", requireAuth, deleteCard);

module.exports = router;