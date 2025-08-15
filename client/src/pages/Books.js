import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Books.css";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => { fetchBooks(); }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/books");
      setBooks(res.data);
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this book?")) {
      try {
        await axios.delete(`http://localhost:5000/api/books/${id}`);
        setBooks(books.filter(book => book._id !== id));
        alert("Book deleted");
      } catch (err) { console.error(err); }
    }
  };

  const categories = [...new Set(books.map(book => book.category))];
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? book.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="books-container">
      <h1>Books</h1>
      <Link to="/add-book"><button>Add New Book</button></Link>

      <input type="text" placeholder="Search by title or author" value={searchTerm}
             onChange={e => setSearchTerm(e.target.value)} />

      <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>

      {filteredBooks.map(book => (
        <div key={book._id} className="book-item">
          <h3><Link to={`/books/${book._id}`}>{book.title}</Link></h3>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Category:</strong> {book.category}</p>
          {book.description && <p>{book.description}</p>}
          <Link to={`/edit-book/${book._id}`}><button>Edit</button></Link>
          <button onClick={() => handleDelete(book._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Books;
