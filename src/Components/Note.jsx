import React from "react";

import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

export default function Note(prop) {
  return (
    <div className="note" id={prop.id}>
      <div style={{ textDecoration: prop.checked && "line-through"}}>
        <h1>{prop.title}</h1>
        <p>{prop.content}</p>
      </div>
      <button onClick={() => { prop.onDelete(prop.id, prop.active) }}><DeleteIcon /></button>
      <button onClick={() => { prop.onChecked( prop.id, prop.checked) }}>{prop.checked ? <CloseIcon /> : <CheckIcon /> }</button>
    </div>
  );
}
