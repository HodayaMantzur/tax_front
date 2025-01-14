import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginClient = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        throw new Error("שגיאה בהתחברות")
      }

      const data = await response.json()
      localStorage.setItem("access_token", data.access)
      localStorage.setItem("refresh_token", data.refresh)

      alert("התחברת בהצלחה!")

      setTimeout(() => {
        navigate("/client-list")
      }, 500)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <div className="container mt-5">
      <h2>כניסת לקוח</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            שם משתמש
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          התחבר
        </button>
      </form>

      <div className="mt-3">
        <p>
          אין לך עדיין חשבון?{" "}
          <button
            onClick={() => navigate("/register")}
            className="btn btn-link"
          >
            צור חשבון
          </button>
        </p>
      </div>

      {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
    </div>
  )
}

export default LoginClient



// import React, { useState } from "react"
// import { useNavigate } from "react-router-dom"

// const LoginClient = () => {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const [errorMessage, setErrorMessage] = useState("")
//   const navigate = useNavigate() // הוספת useNavigate

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const response = await fetch("http://localhost:8000/login/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ username, password }),
//       })

//       if (!response.ok) {
//         throw new Error("שגיאה בהתחברות")
//       }

//       const data = await response.json()
//       localStorage.setItem("access_token", data.access)
//       localStorage.setItem("refresh_token", data.refresh)

//       alert("התחברת בהצלחה!")

//       // הוספת המתנה קצרה לפני ההפניה
//       setTimeout(() => {
//         navigate("/client-list")
//       }, 500) // שינוי מ-window.location.href לנעילה באמצעות useNavigate
//     } catch (error) {
//       setErrorMessage(error.message)
//     }
//   }

//   return (
//     <div className="container mt-5">
//       <h2>כניסת לקוח</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="username" className="form-label">
//             שם משתמש
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             סיסמה
//           </label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           התחבר
//         </button>
//       </form>
//       {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
//     </div>
//   )
// }

// export default LoginClient
