import React, { useState, useEffect } from "react";
import axios from 'axios';

import Header from "./Components/Header";
import Footer from "./Components/Footer"
import Note from "./Components/Note";
import CreateArea from "./Components/CreateArea";

axios.defaults.baseURL = 'http://127.0.0.1:4000/api/';
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
      setNoteList((prevValue) => {
        return result;
      });
    }).catch((response) => {
      console.error("Failed to send request:", response);
    });
  };

  async function addNote(note) {
    const url = '/addNote';

    const { title, content } = note

    const formData = new FormData();
    formData.append('title', title)
    formData.append('content', content)

    try {
      await axios.post(url, formData);
      getNote()
    } catch (error) {
      console.error('Failed to send request:', error);
    }
  }

  async function discardNote(id, active) {
    const url = '/discardNote';

    const formData = new FormData();
    formData.append('id', id)
    formData.append('isActive', !active)

    try {
      await axios.post(url, formData);
      setNoteList((prevValue) => {
        return prevValue.filter((x) => {
          return x._id !== id
        });
      });
    } catch (error) {
      console.error('Failed to send request:', error);
    }
  };

  async function checkedNote(id, checked) {
    const url = '/checkedNote';

    const formData = new FormData();
    formData.append('id', id)
    formData.append('isDone', !checked)

    try {
      await axios.post(url, formData);
      setNoteList((prevValue) => {
        const updatedList = prevValue.map((x) => {
          if (x._id === id) {
            return { ...x, isDone: !x.isDone };
          };
          return x;
        });
        return updatedList;
      });
    } catch (error) {
      console.error('Failed to send request:', error);
    }
  };

  return (
    <div>
      <Header />
      <section>
        <CreateArea onSubmit={addNote} />
      </section>
      <section>
        {noteList.map((note) => (
          note.isActive && <Note
            key={note._id}
            id={note._id}
            title={note.title}
            content={note.content}
            checked={note.isDone}
            active={note.isActive}
            onDelete={discardNote}
            onChecked={checkedNote}
          />
        ))}
      </section>
      <Footer />
    </div>
  );
};
