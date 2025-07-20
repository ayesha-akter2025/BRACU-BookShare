// src/pages/Community.js
import React, { useState } from 'react';

export default function Community() {
  // For sprint 1, just a placeholder
  // You can extend this later with posts, discussions, comments, etc.

  const [posts] = useState([
    { id: 1, author: 'Alice', content: 'Looking for a used Calculus textbook!' },
    { id: 2, author: 'Bob', content: 'Anyone interested in swapping novels?' },
  ]);

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Community Forum</h1>

      {posts.length === 0 ? (
        <p>No posts yet. Be the first to post!</p>
      ) : (
        posts.map(post => (
          <div
            key={post.id}
            style={{
              border: '1px solid #ccc',
              borderRadius: 6,
              padding: 12,
              marginBottom: 10,
            }}
          >
            <p><strong>{post.author}</strong> says:</p>
            <p>{post.content}</p>
          </div>
        ))
      )}

      <p style={{ fontStyle: 'italic', marginTop: 20 }}>
        * Community features such as posting, commenting, and messaging will be implemented in future sprints.
      </p>
    </div>
  );
}
