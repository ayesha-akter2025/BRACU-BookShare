import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Books from "./pages/Books";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Community from "./pages/Community";

import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import BookDetails from "./pages/BookDetails";

import EditProfile from "./pages/EditProfile";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    localStorage.setItem("user", JSON.stringify(userInfo));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };




  const handleUserUpdate = (updatedUser) => {
  setUser(updatedUser);
  localStorage.setItem("user", JSON.stringify(updatedUser));
  };






  return (
    <Router>
      <Routes>
        <Route element={<Layout user={user} onLogout={handleLogout} />}>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              user ? <Navigate to="/profile" replace /> : <Login onLogin={handleLogin} />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/books" element={<Books />} />

          <Route path="/add-book" element={<AddBook />} />
          <Route path="/edit-book/:id" element={<EditBook />} />
          <Route path="/books/:id" element={<BookDetails user={user} />} />



          {/* Publicly accessible */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/community" element={<Community user={user} />} />

          <Route
            path="/profile"
            element={
              user ? <Profile user={user} /> : <Navigate to="/login" replace />
            
            }
          />

          <Route
            path="/edit-profile/:id"
            element={

              user ? <EditProfile onUpdate={(updatedUser) => setUser(updatedUser)} /> : <Navigate to="/login" replace />
              }

              //user ? <EditProfile userId={user.id} onUpdate={handleUserUpdate} /> : <Navigate to="/login" replace />
            //}

          />




        </Route>
      </Routes>
    </Router>
  );
}

export default App;
