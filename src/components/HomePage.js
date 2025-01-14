import React, { useState, useEffect } from "react";
import axios from "axios";
import "./homepage.css";

function HomePage() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      axios
        .get("/api/users/me/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((response) => {
          setUser(response.data);
          setIsAuthenticated(true);
        })
        .catch(() => {
          setIsAuthenticated(false);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1 className="homepage-title">ברוכים הבאים למערכת הפקת חשבוניות</h1>
        <p className="homepage-subtitle">
          כאן תוכלו לנהל את לקוחותיכם, להפיק חשבוניות, ולבדוק את זכאותכם לתחולת
          החוק החדש של מס הכנסה.
        </p>
      </header>
      <main className="homepage-content">
        {isAuthenticated ? (
          <>
            <p className="homepage-welcome">
              שלום <strong>{user?.username}</strong>, התחברתם בהצלחה!
            </p>
            <div className="button-group">
              <a href="/clients" className="btn btn-primary">
                ניהול לקוחות
              </a>
              <a href="/invoices" className="btn btn-secondary">
                חשבוניות
              </a>
              <button onClick={handleLogout} className="btn btn-danger">
                התנתק
              </button>
            </div>
          </>
        ) : (
          <p className="homepage-welcome">
            אנא התחבר כדי להמשיך.
          </p>
        )}
      </main>
    </div>
  );
}

export default HomePage;
