import React from "react";

import Header from "./Components/Header";
import Footer from "./Components/Footer"
import Note from "./Components/Note";
import CreateArea from "./Components/CreateArea";

export default function App() {

  const mockNote = [
    {
      id: 1,
      title: "Bacon",
      content: "Don't forget to buy som bacon.",
      isDone: false,
    },
  ];

  return (
    <div>
      <Header />
      <section>
        <CreateArea />
      </section>
      <section>
        {mockNote.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
          />
        ))}
      </section>
      <Footer />
    </div>
  );
}
