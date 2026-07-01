const express = require("express");
const router = express.Router();

const { 
    getAllCards, 
    getCardById, 
    createCard, 
    updateCard, 
    deleteCard 
} = require("../Controllers/cardController");

router.get("/", getAllCards);
router.get("/:id", getCardById);
router.post("/", createCard);
router.put("/:id", updateCard);
router.delete("/:id", deleteCard);

module.exports = router;