const mongoose = require("mongoose");

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

const getNoteList = async (req, res) => {
  const note = await Note.findNote();
  res.json(note);
};

const addNote = async (req, res) => {
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
};

const checkedNote = async (req, res) => {
  try {
    const { id, isDone } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: id },
      { $set: { isDone } },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    console.log("Note updated successfully");
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).send("Error updating note");
  }
};

const discardNote = async (req, res) => {
  try {
    const { id, isActive } = req.body;
    const discardNote = await Note.findOneAndUpdate(
      { _id: id },
      { $set: { isActive } },
      { new: true }
    );

    if (!discardNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    console.log("Note discard successfully.");
    res.status(200).json(discardNote);
  } catch (error) {
    console.error("Error discard note:", error);
    res.status(500).send("Error discard note");
  }
};

module.exports = {
  getNoteList,
  addNote,
  checkedNote,
  discardNote,
};