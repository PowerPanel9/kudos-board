const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllCards = async (req, res) => {
  try {
    const { boardId } = req.query;
    const where = boardId ? { boardId: parseInt(boardId, 10) } : {};
    const cards = await prisma.card.findMany({ where });
    res.json(cards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cards" });
  }
};

const getCardById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid card id" });
    }

    const card = await prisma.card.findUnique({
      where: { id },
    });
    if (!card) {
      return res.status(404).json({ error: "Card not found" });
    }
    res.json(card);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch card" });
  }
};

const createCard = async (req, res) => {
  try {
    const { message, gifUrl, author, boardId } = req.body;
    const parsedBoardId = parseInt(boardId, 10);

    if (Number.isNaN(parsedBoardId)) {
      return res.status(400).json({ error: "boardId is required" });
    }

    const card = await prisma.card.create({
      data: {
        message,
        gifUrl,
        author: author?.trim() ? author.trim() : null,
        boardId: parsedBoardId,
        ownerId: req.user?.userId ?? null,
      },
    });
    res.status(201).json(card);
  } catch (err) {
    if (err.code === "P2003") {
      return res.status(400).json({ error: "Invalid boardId" });
    }
    res.status(500).json({ error: "Failed to create card" });
  }
};

const updateCard = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid card id" });
    }

    const updatedCard = await prisma.card.update({
      where: { id },
      data: { upvotes: { increment: 1 } },
    });
    res.json(updatedCard);
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Card not found" });
    }
    res.status(500).json({ error: "Failed to update card" });
  }
};

const deleteCard = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid card id" });
    }

    await prisma.card.delete({
      where: { id },
    });
    res.json({ message: "Card deleted successfully" });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Card not found" });
    }
    res.status(500).json({ error: "Failed to delete card" });
  }
};

module.exports = { getAllCards, getCardById, createCard, updateCard, deleteCard };