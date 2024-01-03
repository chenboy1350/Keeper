import React from "react";

import Header from "./Components/Header";
import Footer from "./Components/Footer"
import Note from "./Components/Note";

export default function App() {
  return (
    <div>
      <Header />
      <section>
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
      </section>
      <Footer />
    </div>
  );
}
