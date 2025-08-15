// src/components/Layout.js
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = ({ user, onLogout }) => {
  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <main style={{ minHeight: "80vh", padding: "1rem" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
