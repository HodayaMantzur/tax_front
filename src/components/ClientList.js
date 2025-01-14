import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom" // ניווט לעמוד החשבוניות

const ClientList = () => {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // פונקציה לטעינת הלקוחות מה-API
  useEffect(() => {
    const token = localStorage.getItem("access_token")
    if (!token) {
      alert("נא להתחבר קודם.")
      return
    }

    axios
      .get("http://127.0.0.1:8000/api/transactions/clients/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data && Array.isArray(response.data.clients)) {
          setClients(response.data.clients)
        } else {
          setError("שגיאה בטעינת הלקוחות.")
        }
        setLoading(false)
      })
      .catch((error) => {
        console.error(
          "Error fetching clients:",
          error.response ? error.response.data : error.message
        )
        setError("שגיאה בטעינת הלקוחות.")
        setLoading(false)
      })
  }, [])

  const viewUserInvoices = () => {
    navigate("/user-invoices") // מעבר לעמוד החשבוניות
  }

  const deleteClient = (clientId) => {
    const token = localStorage.getItem("access_token")
    if (!token) {
      alert("נא להתחבר קודם.")
      return
    }

    if (window.confirm("האם אתה בטוח שברצונך למחוק את הלקוח?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/transactions/clients/${clientId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          alert("הלקוח נמחק בהצלחה!")
          setClients(clients.filter((client) => client.id !== clientId))
        })
        .catch((error) => {
          console.error("Error deleting client:", error)
          alert("שגיאה במחיקת הלקוח.")
        })
    }
  }

  const addClient = () => {
    const clientName = prompt("הכנס שם לקוח:")
    const clientID = prompt("הכנס ח.פ/ת.ז:")
    const clientEmail = prompt("הכנס אימייל לקוח:")
    const clientPhone = prompt("הכנס טלפון לקוח:")
    const clientAddress = prompt("הכנס כתובת (אופציונלי):")

    if (!clientName || !clientID || !clientEmail || !clientPhone) {
      alert("כל השדות (למעט כתובת) נדרשים.")
      return
    }

    const token = localStorage.getItem("access_token")
    if (!token) {
      alert("נא להתחבר קודם.")
      return
    }

    axios
      .post(
        "http://127.0.0.1:8000/api/transactions/clients/",
        {
          name: clientName,
          id_number: clientID,
          email: clientEmail,
          phone_number: clientPhone,
          address: clientAddress,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert("לקוח נוסף בהצלחה!")
        setClients([...clients, response.data.client])
      })
      .catch((error) => {
        console.error(
          "Error adding client:",
          error.response ? error.response.data : error.message
        )
        alert("שגיאה בהוספת הלקוח.")
      })
  }

  const selectClient = (client) => {
    localStorage.setItem("selected_client", JSON.stringify(client))
    window.location.href = "/create-invoice"
  }

  if (loading) {
    return <div>טעינה...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <div className="container mt-5">
      <h2>לקוחות</h2>
      <div className="mb-3">
        <button className="btn btn-success" onClick={addClient}>
          הוסף לקוח חדש
        </button>
        <button className="btn btn-info ml-2" onClick={viewUserInvoices}>
          צפייה בכל החשבוניות
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>שם</th>
            <th>ח.פ/ת.ז</th>
            <th>אימייל</th>
            <th>טלפון</th>
            <th>כתובת</th>
            <th>פעולות</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(clients) &&
            clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.id_number || "לא זמין"}</td>
                <td>{client.email}</td>
                <td>{client.phone_number}</td>
                <td>{client.address}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteClient(client.id)}
                  >
                    מחק
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => selectClient(client)}
                  >
                    בחר
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default ClientList
