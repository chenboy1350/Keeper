const express = require("express");

const noteRoutes = require("./routes/noteRoute");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/api", noteRoutes);

app.get("/api/", (req, res) => {
  console.log("Hello guy! this is keeper API.");
  res.send("Hello guy! this is keeper API.");
});

app.all("*", (req, res) =>
  res.send("You've tried reaching a route that doesn't exist.")
);

app.listen(PORT, () => {
  console.log(`Keeper Server Listening on port ${PORT}`);
});
