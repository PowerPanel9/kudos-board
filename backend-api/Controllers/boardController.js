const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllBoards = async (req, res) => {
  try {
    const { filter, category } = req.query;
    const allowedCategories = ["Celebration", "Thank You", "Inspiration"];

    const where = {};
    if (category) {
      if (!allowedCategories.includes(category)) {
        return res.status(400).json({ error: "Invalid category filter" });
      }
      where.category = category;
    } else if (filter && filter !== "all" && filter !== "recent") {
      if (!allowedCategories.includes(filter)) {
        return res.status(400).json({ error: "Invalid filter value" });
      }
      where.category = filter;
    }

    const orderBy = filter === "recent" ? { createdAt: "desc" } : undefined;

    const boards = await prisma.board.findMany({
      where,
      orderBy,
    });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch boards" });
  }
};

const getBoardById = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid board id" });
    }

    const board = await prisma.board.findUnique({
      where: { id },
    });
    if (!board) {
      return res.status(404).json({ error: "Board not found" });
    }
    res.json(board);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch board" });
  }
};

const createBoard = async (req, res) => {
  try {
    const { title, category, author, imageUrl } = req.body;
    const board = await prisma.board.create({
      data: { title, category, author, imageUrl },
    });
    res.status(201).json(board);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Board already exists" });
    }
    res.status(500).json({ error: "Failed to create board" });
  }
};

const updateBoard = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid board id" });
    }

    const { title, category, author, imageUrl } = req.body;
    const updatedBoard = await prisma.board.update({
      where: { id },
      data: { title, category, author, imageUrl },
    });
    res.json(updatedBoard);
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Board not found" });
    }
    res.status(500).json({ error: "Failed to update board" });
  }
};

const deleteBoard = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Invalid board id" });
    }

    await prisma.board.delete({
      where: { id },
    });
    res.json({ message: "Board deleted successfully" });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Board not found" });
    }
    res.status(500).json({ error: "Failed to delete board" });
  }
};

module.exports = { getAllBoards, getBoardById, createBoard, updateBoard, deleteBoard };