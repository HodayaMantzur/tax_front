import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

function RegisterClient() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
    email: "",
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [passwordError, setPasswordError] = useState("") // הודעה לשגיאת סיסמה
  const navigate = useNavigate()

  // עדכון הערכים של השדות בטופס
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    if (e.target.name === "password" && e.target.value.length < 8) {
      setPasswordError("הסיסמה חייבת להכיל לפחות 8 תווים.")
    } else {
      setPasswordError("")
    }
  }

  // טיפול בשליחת הטופס
  const handleSubmit = async (e) => {
    e.preventDefault()

    // בדיקת אורך הסיסמה
    if (formValues.password.length < 8) {
      setPasswordError("הסיסמה חייבת להכיל לפחות 8 תווים.")
      return
    }

    try {
      // בקשת POST לשרת לצורך יצירת יוזר חדש
      const response = await axios.post(
        "http://localhost:8000/home/register/",
        {
          username: formValues.username,
          password: formValues.password,
          email: formValues.email,
        }
      )

      if (response.status === 201) {
        alert("החשבון נוצר בהצלחה!")
        localStorage.setItem("access_token", response.data.access_token)
        localStorage.setItem("refresh_token", response.data.refresh_token)
        navigate("/client-list") // מעבר לעמוד רשימת הלקוחות או הוספת לקוח
      }
    } catch (error) {
      console.error("שגיאה ביצירת החשבון:", error)
      

      if (error.response && error.response.data) {
        const errorData = error.response.data
        const errors = Object.entries(errorData)
          .map(([key, value]) => `${key}: ${value.join(", ")}`)
          .join("\n")
        setErrorMessage(errors)
      } else {
        setErrorMessage("שגיאה ביצירת החשבון. נסה שוב.")
      }
    }
  }

  return (
    <div className="container mt-5">
      <h2>הרשמה ללקוח</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            שם משתמש
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formValues.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            סיסמה
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
          {passwordError && (
            <div className="text-danger mt-1">{passwordError}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            אימייל
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          צור חשבון
        </button>
      </form>

      {errorMessage && <pre className="text-danger mt-3">{errorMessage}</pre>}
    </div>
  )
}

export default RegisterClient
