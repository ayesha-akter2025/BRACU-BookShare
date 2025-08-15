import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", author: "", category: "", description: "" });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/books/${id}`).then(res => setFormData(res.data));
  }, [id]);

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/books/${id}`, formData);
      alert("Book updated!");
      navigate("/books");
    } catch (err) { console.error(err); alert("Update failed"); }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h1>Edit Book</h1>
      <input name="title" value={formData.title} onChange={handleChange} required/>
      <input name="author" value={formData.author} onChange={handleChange} required/>
      <input name="category" value={formData.category} onChange={handleChange} />
      <textarea name="description" value={formData.description} onChange={handleChange} />
      <button type="submit">Save</button>
    </form>
  );
}
