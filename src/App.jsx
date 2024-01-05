import React, { useState } from "react";

import Header from "./Components/Header";
import Footer from "./Components/Footer"
import Note from "./Components/Note";
import CreateArea from "./Components/CreateArea";

export default function App() {

  let mockNote = [
    {
      id: 1,
      title: "Bacon",
      content: "Don't forget to buy som bacon.",
      isDone: false,
    },
  ];

  const [noteList, setNoteList] = useState(mockNote);

  function addNote(note) {
    const { title, content} = note
    const page = { id: noteList.length + 1, title: title, content: content, isDone: false }

    setNoteList((prevValue) => {
      return [
        ...prevValue,
        page
      ]
    })
  }

  function deleteNote(id) {
    setNoteList((prevValue) => {
      return prevValue.filter((x) => {
        return x.id !== id
      })
    })
  }

  function checkedNote(id) {
    setNoteList((prevValue) => {
      const updatedList = prevValue.map((x) => {
        if (x.id === id) {
          return { ...x, isDone: !x.isDone };
        }
        return x;
      });
      return updatedList;
    });
  }

  return (
    <div>
      <Header />
      <section>
        <CreateArea onSubmit={addNote} />
      </section>
      <section>
        {noteList.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            checked={note.isDone}
            onDelete={deleteNote}
            onChecked={checkedNote}
          />
        ))}
      </section>
      <Footer />
    </div>
  );
}
