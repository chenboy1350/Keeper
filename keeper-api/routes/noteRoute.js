const express = require("express");
const multer = require("multer");

const { getNoteList, addNote, checkedNote, discardNote } = require("../controllers/noteController");
const { noteAddModel, noteCheckedModel, noteDiscardModel } = require("../models/noteModel");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/getNoteList", getNoteList);

router.post("/addNote", upload.fields(noteAddModel), addNote);

router.post("/checkedNote", upload.fields(noteCheckedModel), checkedNote);

router.post("/discardNote", upload.fields(noteDiscardModel), discardNote);

module.exports = router;