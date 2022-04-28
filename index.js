const express = require("express");
const dotenv = require("dotenv");

const api = require("./routes/api");

const app = express();

dotenv.config({
  path: "config.env",
});

const PORT = process.env.PORT || 8080;

app.use(express.json());

// Load Routers
app.use("/", api);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
