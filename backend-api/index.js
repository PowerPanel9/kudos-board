require("dotenv").config();
// use express morgan dependencies

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const boardRoutes = require("./Routes/boardRoute");
const cardRoutes = require("./Routes/cardRoute");
const app = express();
const PORT = process.env.PORT;



app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`SUCCESSFULLY CONNECTED TO THE API`);
  });

app.use("/api/boards", boardRoutes);
app.use("/api/cards", cardRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});