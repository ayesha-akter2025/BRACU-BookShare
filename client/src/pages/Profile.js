import React from "react";
import { Link } from "react-router-dom";

export default function Profile({ user }) {
  if (!user) {
    return (
      <div style={{ padding: 20, maxWidth: 600, margin: "auto", fontFamily: "Arial, sans-serif" }}>
        <h2>Please log in to view your profile</h2>
        <Link
          to="/login"
          style={{
            display: "inline-block",
            marginTop: 20,
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: 4,
            textDecoration: "none"
          }}
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "auto", fontFamily: "Arial, sans-serif" }}>
      <h2>Your Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Bio:</strong> {user.bio || "Not set"}</p>
      <p><strong>Location:</strong> {user.location || "Not set"}</p>

      <Link
        to={`/edit-profile/${user._id}`} // Use _id here
        style={{
          display: "inline-block",
          marginTop: 20,
          padding: "10px 20px",
          backgroundColor: "#28a745",
          color: "white",
          borderRadius: 4,
          textDecoration: "none"
        }}
      >
        Edit Profile
      </Link>
    </div>
  );
}
