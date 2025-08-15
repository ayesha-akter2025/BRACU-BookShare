import React, { useState } from "react";
import axios from "axios";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/books", { title, author, category, description });
      alert("Book added successfully");
      setTitle(""); setAuthor(""); setCategory(""); setDescription("");
    } catch (err) {
      console.error(err); alert("Failed to add book");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Add a New Book</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Book Title" value={title} onChange={e => setTitle(e.target.value)} required/>
        <input name="author" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required/>
        <input name="category" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
        <textarea name="description" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
