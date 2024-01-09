const noteAddModel = [
  { name: "title", maxCount: 1 },
  { name: "content", maxCount: 1 },
];

const noteCheckedModel = [
  { name: "id", maxCount: 1 },
  { name: "isDone", maxCount: 1 },
];

const noteDiscardModel = [
  { name: "id", maxCount: 1 },
  { name: "isActive", maxCount: 1 },
];

module.exports = {
  noteAddModel,
  noteCheckedModel,
  noteDiscardModel,
};
