import React, { useState } from "react";
import "./Books.css";

const sampleBooks = [
  { id: 1, title: "The Hobbit", author: "J.R.R. Tolkien", category: "Fantasy" },
  { id: 2, title: "1984", author: "George Orwell", category: "Dystopian" },
  { id: 3, title: "Clean Code", author: "Robert C. Martin", category: "Programming" },
  { id: 4, title: "Harry Potter", author: "J.K. Rowling", category: "Fantasy" },
  { id: 5, title: "React Explained", author: "Zac Gordon", category: "Programming" },
];

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const categories = [...new Set(sampleBooks.map((book) => book.category))];

  const filteredBooks = sampleBooks.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = filterCategory ? book.category === filterCategory : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="books-container">
      <h1>Books Page</h1>

      <input
        type="text"
        placeholder="Search by title or author"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="books-search"
      />

      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="books-filter"
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {filteredBooks.length > 0 ? (
        filteredBooks.map((book) => (
          <div key={book.id} className="book-item">
            <h3>{book.title}</h3>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Category:</strong> {book.category}
            </p>
          </div>
        ))
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
};

export default Books;
