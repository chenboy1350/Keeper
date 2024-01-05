import React, { useState } from "react";

import AddIcon from '@mui/icons-material/Add';

function CreateArea(prop) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  function handleChange(event){
    const { name, value } = event.target;

    setNote((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      }
    });
  }

  function handleSubmit(event) {
    prop.onSubmit(note)
    event.preventDefault();
    setNote(() => {
      return {
        title: "",
        content: ""
      }
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} value={note.title}/>
        <textarea name="content" placeholder="Take a note..." rows="3" onChange={handleChange} value={note.content} />
        <button type="submit"><AddIcon/></button>
      </form>
    </div>
  );
}

export default CreateArea;
