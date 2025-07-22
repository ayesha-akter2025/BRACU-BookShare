// src/pages/Community.js
import React, { useState } from "react";

export default function Community({ user }) {
  const [posts, setPosts] = useState([
    { id: 1, author: "Alice", content: "Looking for a copy of Data Structures textbook." },
    { id: 2, author: "Bob", content: "Selling a used calculus book, contact me!" },
  ]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: posts.length + 1,
      author: user.name,
      content: newPost.trim(),
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>Community Posts</h2>

      {user ? (
        <form onSubmit={handlePostSubmit} style={{ marginBottom: 20 }}>
          <textarea
            rows={3}
            placeholder="Write something..."
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            style={{ width: "100%", padding: 10, fontSize: 16, borderRadius: 4 }}
          />
          <button type="submit" style={{ marginTop: 10, padding: "8px 16px" }}>
            Post
          </button>
        </form>
      ) : (
        <p style={{ fontStyle: "italic", color: "#555" }}>
          You must be logged in to post in the community.
        </p>
      )}

      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map(({ id, author, content }) => (
          <li
            key={id}
            style={{
              background: "#f9f9f9",
              borderRadius: 6,
              padding: 12,
              marginBottom: 12,
              boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            }}
          >
            <p style={{ margin: 0, fontWeight: "bold" }}>{author} says:</p>
            <p style={{ marginTop: 6 }}>{content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
