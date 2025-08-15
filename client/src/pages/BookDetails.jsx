import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BookDetails({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleBorrowReturn = async () => {
    try {
      const borrower = book.borrower ? null : user._id;
      const res = await axios.put(`http://localhost:5000/api/books/borrow/${id}`, { borrower });
      setBook(res.data);
      alert(book.borrower ? "Book returned" : "Book borrowed");
    } catch (err) {
      console.error(err); alert("Action failed");
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Category:</strong> {book.category}</p>
      {book.description && <p>{book.description}</p>}
      <p><strong>Status:</strong> {book.borrower ? "Borrowed" : "Available"}</p>
      {user && <button onClick={handleBorrowReturn}>{book.borrower ? "Return Book" : "Borrow Book"}</button>}
      <button onClick={() => navigate("/books")}>Back to Books</button>
    </div>
  );
}
