const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 4000;

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

require("dotenv").config();
const mongoDBUrl = process.env.MONGODB_CONNECTION_STRING;

mongoose.connect(mongoDBUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const Schema = mongoose.Schema;
const noteSchema = new Schema({
  id: Number,
  title: String,
  content: String,
  isDone: Boolean,
  isActive: Boolean,
});

noteSchema.statics.findNote = async function () {
  return this.find();
};

const Note = mongoose.model("Note", noteSchema);

app.get("/api/", (req, res) => {
  console.log("Hello guy! this is keeper api.");
});

app.get("/api/getNoteList", async (req, res) => {
  const note = await Note.findNote();
  res.json(note);
});

let noteModel = [
  { name: "title", maxCount: 1 },
  { name: "content", maxCount: 1 },
];

app.post("/api/addNote", upload.fields(noteModel), async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await Note.findNote();
    const newNote = new Note({
      id: note.length + 1,
      title: title,
      content: content,
      isDone: false,
      isActive: true,
    });

    const savedNote = await newNote.save();

    console.log("Note saved successfully:");
    res.status(200).json(savedNote);
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).send("Error saving note");
  }
});

let noteCheckedModel = [
  { name: "id", maxCount: 1 },
  { name: "isDone", maxCount: 1 },
];

app.post(
  "/api/checkedNote",
  upload.fields(noteCheckedModel),
  async (req, res) => {
    try {
      const { id, isDone } = req.body;
      console.log(id);
      const updatedNote = await Note.findOneAndUpdate(
        { _id: id },
        { $set: { isDone } },
        { new: true }
      );

      if (!updatedNote) {
        return res.status(404).json({ error: "Note not found" });
      }

      console.log("Note updated successfully:", updatedNote);
      res.status(200).json(updatedNote);
    } catch (error) {
      console.error("Error updating note:", error);
      res.status(500).send("Error updating note");
    }
  }
);

let noteDiscardModel = [
  { name: "id", maxCount: 1 },
  { name: "isActive", maxCount: 1 },
];

app.post(
  "/api/discardNote",
  upload.fields(noteDiscardModel),
  async (req, res) => {
    try {
      const { id, isActive } = req.body;
      console.log(id);
      const discardNote = await Note.findOneAndUpdate(
        { _id: id },
        { $set: { isActive } },
        { new: true }
      );

      if (!discardNote) {
        return res.status(404).json({ error: "Note not found" });
      }

      console.log("Note discard successfully:", discardNote);
      res.status(200).json(discardNote);
    } catch (error) {
      console.error("Error discard note:", error);
      res.status(500).send("Error discard note");
    }
  }
);

app.listen(PORT, () => {
  console.log(`Keeper Server Listening on port ${PORT}`);
});
