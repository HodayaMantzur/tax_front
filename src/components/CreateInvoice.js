import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./modern-invoice.css" // קובץ CSS מותאם

const CreateInvoice = () => {
  const [client, setClient] = useState(null)
  const [user, setUser] = useState(null) // פרטי המשתמש
  const [amount, setAmount] = useState("")
  const [quantity, setQuantity] = useState("")
  const [description, setDescription] = useState("")
  const [includeVAT, setIncludeVAT] = useState(false)
  const [invoiceDate, setInvoiceDate] = useState(
    new Date().toISOString().split("T")[0]
  ) // תאריך החשבונית
  const [invoiceDetails, setInvoiceDetails] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const selectedClient = JSON.parse(localStorage.getItem("selected_client"))
    if (selectedClient) {
      setClient(selectedClient)
    } else {
      navigate("/clients")
    }

    const token = localStorage.getItem("access_token")
    if (token) {
      axios
        .get("http://127.0.0.1:8000/home/me/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data)
        })
        .catch((error) => {
          console.error("Error fetching user details:", error)
          setError("שגיאה בטעינת פרטי המשתמש.")
        })
    }
  }, [navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const token = localStorage.getItem("access_token")
    if (!token) {
      alert("נא להתחבר קודם.")
      return
    }

    const numericAmount = parseFloat(amount) || 0
    const numericQuantity = parseInt(quantity, 10) || 1

    let totalAmount = numericAmount * numericQuantity
    if (includeVAT) {
      totalAmount += totalAmount * 0.18
    }

    const data = {
      client: client.id,
      amount: totalAmount,
      description: description || 'שכ"ט',
      quantity: quantity || 1,
      include_vat: includeVAT,
      type: "הכנסה",
      date: invoiceDate,
    }

    axios
      .post("http://127.0.0.1:8000/api/transactions/invoices/create/", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setInvoiceDetails(response.data.transaction)
        alert("החשבונית נוצרה בהצלחה!")
      })
      .catch((error) => {
        console.error("Error creating invoice:", error)
        setError("שגיאה ביצירת החשבונית.")
      })
      .finally(() => setLoading(false))
  }

  const handlePrint = () => {
    const printContent = document.getElementById("invoice-print-section").innerHTML
    const originalContent = document.body.innerHTML
    document.body.innerHTML = printContent
    window.print()
    document.body.innerHTML = originalContent
    navigate("/client-list")
  }

  return (
    <div className="modern-container">
      <button
        className="modern-back-button"
        onClick={() => navigate("/client-list")}
      >
        חזור  
      </button>
      <h2 className="modern-title">יצירת חשבונית ללקוח</h2>
      {client ? (
        <div className="modern-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="quantity" className="modern-label">
                כמות:
              </label>
              <input
                type="number"
                className="modern-input"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount" className="modern-label">
                מחיר ליחידה:
              </label>
              <input
                type="number"
                className="modern-input"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description" className="modern-label">
                תיאור:
              </label>
              <input
                type="text"
                className="modern-input"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="invoiceDate" className="modern-label">
                תאריך:
              </label>
              <input
                type="date"
                className="modern-input"
                id="invoiceDate"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group form-check modern-check">
              <input
                type="checkbox"
                className="modern-checkbox"
                id="includeVAT"
                checked={includeVAT}
                onChange={(e) => setIncludeVAT(e.target.checked)}
              />
              <label className="modern-label" htmlFor="includeVAT">
                הוסף מע"מ (18%)
              </label>
            </div>
            <button
              type="submit"
              className="modern-btn-primary"
              disabled={loading}
            >
              {loading ? "טוען..." : "צור חשבונית"}
            </button>
          </form>
          {invoiceDetails && (
            <div id="invoice-print-section" className="modern-invoice mt-5">
              <h3 className="invoice-title">חשבונית</h3>
              <div className="invoice-header">
                <p><strong>תאריך:</strong> {invoiceDate}</p>
                <p><strong>מפיק החשבונית:</strong> {user?.username || "לא זמין"}</p>
                <p><strong>אימייל:</strong> {user?.email || "לא זמין"}</p>
              </div>
              <hr />
              <div className="invoice-client">
                <p><strong>לקוח:</strong> {client.name}</p>
                <p><strong>ח.פ/ת.ז:</strong> {client.id_number}</p>
                <p><strong>כתובת:</strong> {client.address || "לא צוינה כתובת"}</p>
                <p><strong>טלפון:</strong> {client.phone_number}</p>
              </div>
              <hr />
              <table className="modern-table">
                <thead>
                  <tr>
                    <th>תיאור</th>
                    <th>כמות</th>
                    <th>מחיר ליחידה</th>
                    <th>סה"כ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{invoiceDetails?.description || "לא זמין"}</td>
                    <td>{invoiceDetails?.quantity || "לא זמין"}</td>
                    <td>₪{(invoiceDetails?.amount / invoiceDetails?.quantity)?.toFixed(2) || "לא זמין"}</td>
                    <td>₪{invoiceDetails?.amount || "לא זמין"}</td>
                  </tr>
                </tbody>
              </table>
              <hr />
              <div className="invoice-footer">
                <p className="thank-you">!תודה על העסקה</p>
              </div>
            </div>
          )}
          <button className="modern-btn-secondary mt-3" onClick={handlePrint}>
            הדפס חשבונית
          </button>
          {error && <p className="modern-error">{error}</p>}
        </div>
      ) : (
        <p className="loading">טעינת פרטי הלקוח...</p>
      )}
    </div>
  )
}

export default CreateInvoice
