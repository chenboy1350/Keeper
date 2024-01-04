import React from "react";

export default function Note(prop) {
  return (
    <div className="note" id={prop.id}>
      <h1>{prop.title}</h1>
      <p>{prop.content}</p>
      <button>DELETE</button>
    </div>
  );
}
