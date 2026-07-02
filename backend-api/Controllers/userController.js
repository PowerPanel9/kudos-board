const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;
const MIN_PASSWORD_LENGTH = 8;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "10d";

const buildToken = (user) =>
  jwt.sign(
    {
      userId: user.id,
      name: user.name || user.username,
      username: user.username,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

const register = async (req, res) => {
  const { name, email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ error: "Email, username, and password are required" });
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return res
      .status(400)
      .json({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long` });
  }

  if (!JWT_SECRET) {
    return res.status(500).json({ error: "JWT_SECRET is not configured" });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim();
    const normalizedName = (name || "").trim();

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email: normalizedEmail }, { username: normalizedUsername }] },
    });

    if (existing) {
      const field = existing.email === normalizedEmail ? "email" : "username";
      return res.status(409).json({ error: `${field} already in use` });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        username: normalizedUsername,
        password: hashedPassword,
      },
    });

    const token = buildToken(user);
    return res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name || normalizedName || user.username,
        email: user.email,
        username: user.username,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error registering user", error);
    return res.status(500).json({ error: "Failed to register user" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (!JWT_SECRET) {
    return res.status(500).json({ error: "JWT_SECRET is not configured" });
  }

  try {
    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const correctPassword = await bcrypt.compare(password, user.password);
    if (!correctPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = buildToken(user);
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name || user.username,
        email: user.email,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Error logging in", error);
    return res.status(500).json({ error: "Failed to login" });
  }
};

module.exports = { register, login };
