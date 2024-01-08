import React, { useState, useEffect } from "react";
import axios from 'axios';

import Header from "./Components/Header";
import Footer from "./Components/Footer"
import Note from "./Components/Note";
import CreateArea from "./Components/CreateArea";

axios.defaults.baseURL = 'http://127.0.0.1:4000/api/';
axios.defaults.headers.common['Authorization'] = "Y3i33YWV1ok6QpjRKf5AcR6ujsTrO4IXISgt0tI6viWYubJvIb1s5lgXD1uiPdUj";
axios.defaults.headers.common["Content-Type"] = 'content-Type';
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
axios.defaults.headers.get['Content-Type'] = 'application/json';

export default function App() {

  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    getNote();
  }, []);

  async function getNote() {
    const url = '/getNoteList';
    await axios({
      method: 'get',
      url: url,
    }).then((response) => {
      const result = response.data;
      console.log(result);
      setNoteList((prevValue) => {
        return result;
      });
    }).catch((response) => {
      console.error("Failed to send request:", response);
    });
  };

  async function addNote2() {
    const url = '/addNote';

    const formData = new FormData();
    formData.append('id', 1234556)

    await axios.post(url, formData).then((response) => {
      const result = response.data;
      console.log(result);
    }).catch((response) => {
      console.error("Failed to send request:", response);
    });
  }

  function addNote(note) {
    const { title, content} = note
    const page = { id: noteList.length + 1, title: title, content: content, isDone: false }

    setNoteList((prevValue) => {
      return [
        ...prevValue,
        page
      ];
    });
  };

  function deleteNote(id) {
    setNoteList((prevValue) => {
      return prevValue.filter((x) => {
        return x.id !== id
      });
    });
  };

  function checkedNote(id) {
    addNote2();
    setNoteList((prevValue) => {
      const updatedList = prevValue.map((x) => {
        if (x.id === id) {
          return { ...x, isDone: !x.isDone };
        };
        return x;
      });
      return updatedList;
    });
  };

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
};
