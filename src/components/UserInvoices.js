import React, { useState, useEffect } from "react";
import axios from "axios";
import "./modern-invoice.css";

const UserInvoices = () => {
  const [transactions, setTransactions] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("נא להתחבר קודם.");
      return;
    }

    axios
      .get("http://127.0.0.1:8000/home/client_dashboard/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setTransactions(response.data.transactions);
        setTotalAmount(response.data.total_amount);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching invoices:", error);
        setError("שגיאה בטעינת החשבוניות.");
        setLoading(false);
      });
  }, []);

  const formatCurrency = (amount) => {
    return `₪${parseFloat(amount).toFixed(2)}`;
  };

  return (
    <div className="modern-container mt-5">
      <h2 className="modern-title">סיכום חשבוניות </h2>
      {loading ? (
        <p>טוען...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <div>
          <table className="modern-table">
            <thead>
              <tr>
                <th>תאריך</th>
                <th>לקוח</th>
                <th>תיאור</th>
                <th>כמות</th>
                <th>סכום כולל</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.client_name || "לא זמין"}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.quantity}</td>
                  <td>{formatCurrency(transaction.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="summary-section">
            <h3>סך כל החשבוניות: {formatCurrency(totalAmount)}</h3>
            {totalAmount < 120000 ? (
              <div className="alert alert-success mt-3">
                <p>
                  איזה כיף! אין צורך בהגשת דוח שנתי. עפ"י החוק החדש תוכל להגיש דו"ח
                  מקוצר כאן:{" "}
                  <a
                    href="https://www.gov.il/he/service/annual-income-report-small-business-owner"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    gov.il
                  </a>
                </p>
              </div>
            ) : (
              <div className="alert alert-warning mt-3">
                <p>.שימו לב: יש צורך בהגשת דוח שנתי! מומלץ לפנות לרו"ח/יועץ מס </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInvoices;
