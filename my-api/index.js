const express = require("express");
const multer = require("multer");

const app = express();
const port = 4000;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

let mockNote = [
  {
    id: 1,
    title: "Bacon",
    content: "Don't forget to buy som bacon.",
    isDone: false,
  },
  {
    id: 2,
    title: "Carot",
    content: "Don't forget to buy som carot.",
    isDone: false,
  },
];
  
app.get("/api/", (req, res) => {
    console.log("Hello guy! this is keeper api.");
});

app.get("/api/getNoteList", (req, res) => {
    res.json(mockNote);
});

app.post("/api/addNote", (req, res) => {
  res.send(req.body);
});

app.listen(port, () => {
  console.log(`Keeper Server Listening on port ${port}`);
});
