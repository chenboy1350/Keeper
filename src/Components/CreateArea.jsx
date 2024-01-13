import React, { useState } from "react";

import AddIcon from '@mui/icons-material/Add';
import { Zoom } from "@mui/material";

function CreateArea(prop) {
  const [isExplanded, SetExplanded] = useState(false);
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
      };
    });
  };

  function handleSubmit(event) {
    prop.onSubmit(note);
    event.preventDefault();
    setNote(() => {
      return {
        title: "",
        content: "",
      };
    });
  };

  function expland() {
    SetExplanded(true);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        { isExplanded && <input name="title" placeholder="Title" onChange={handleChange} value={note.title}/>}
        <textarea name="content" placeholder="Take a note..." rows={ isExplanded ? 3 : 1 } onClick={expland} onChange={handleChange} value={note.content} />
        <Zoom in={ isExplanded }>
          <button type="submit"><AddIcon /></button>
        </Zoom>
      </form>
    </div>
  );
};

export default CreateArea;
