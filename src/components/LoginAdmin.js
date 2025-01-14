import React, { useState } from 'react';

const LoginAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [users, setUsers] = useState([]); // שמירת רשימת המשתמשים
    const [isLoggedIn, setIsLoggedIn] = useState(false); // מצב התחברות

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // התחברות
            const loginResponse = await fetch('http://localhost:8000/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!loginResponse.ok) {
                throw new Error('שגיאה בהתחברות');
            }

            const loginData = await loginResponse.json();
            localStorage.setItem('access_token', loginData.access);
            localStorage.setItem('refresh_token', loginData.refresh);

            console.log('Login successful. Access token:', loginData.access);

            // קריאת רשימת המשתמשים
            const usersResponse = await fetch('http://localhost:8000/api/transactions/admin_dashboard/', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${loginData.access}`,
                },
            });

            if (!usersResponse.ok) {
                throw new Error('שגיאה בטעינת רשימת המשתמשים');
            }

            const usersData = await usersResponse.json();
            console.log('Users data:', usersData);

            setUsers(usersData.users); // שמירת רשימת המשתמשים
            setIsLoggedIn(true); // עדכון מצב התחברות
        } catch (error) {
            console.error(error.message);
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="container mt-5">
            {!isLoggedIn ? (
                <>
                    <h2>כניסת מנהל</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">שם משתמש</label>
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
                            <label htmlFor="password" className="form-label">סיסמה</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">התחבר</button>
                    </form>
                    {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
                </>
            ) : (
                <>
                    <h2>ברוך הבא, מנהל!</h2>
                    <div className="mt-5">
                        <h3>רשימת יוזרים</h3>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>שם משתמש</th>
                                    <th>מזהה</th>
                                    <th>מייל</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={user.id}>
                                        <td>{index + 1}</td>
                                        <td>{user.username}</td>
                                        <td>{user.id}</td>
                                        <td>{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default LoginAdmin;


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // התחברות
//       const loginResponse = await fetch('http://localhost:8000/login/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!loginResponse.ok) {
//         throw new Error('שגיאה בהתחברות');
//       }

//       const loginData = await loginResponse.json();
//       localStorage.setItem('access_token', loginData.access);
//       localStorage.setItem('refresh_token', loginData.refresh);

//       // קריאת רשימת המשתמשים
//       const usersResponse = await fetch('http://localhost:8000/transactions/admin_dashboard/', {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${loginData.access}`,
//         },
//       });

//       if (!usersResponse.ok) {
//         throw new Error('שגיאה בטעינת רשימת המשתמשים');
//       }

//       const usersData = await usersResponse.json();
//       setUsers(usersData.users); // שמירת רשימת המשתמשים

//     } catch (error) {
//       setErrorMessage(error.message);
//     }
//   };

// return (
//     <div className="container mt-5">
//       <h2>כניסת מנהל</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="username" className="form-label">שם משתמש</label>
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
//           <label htmlFor="password" className="form-label">סיסמה</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">התחבר</button>
//       </form>
//       {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}

//       {users.length > 0 && (
//         <div className="mt-5">
//           <h3>רשימת יוזרים</h3>
//           <ul className="list-group">
//             {users.map((user) => (
//               <li key={user.id} className="list-group-item">
//                 {user.username} (ID: {user.id})
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LoginAdmin;


// import React, { useState } from 'react';

// const LoginAdmin = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('http://localhost:8000/login/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ username, password }),
//       });

//       if (!response.ok) {
//         throw new Error('שגיאה בהתחברות');
//       }

//       const data = await response.json();
//       localStorage.setItem('access_token', data.access);
//       localStorage.setItem('refresh_token', data.refresh);

//       alert('התחברת בהצלחה!');
//       window.location.href = '/clients_list'; // דף הלקוחות
//     } catch (error) {
//       setErrorMessage(error.message);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <h2>כניסת מנהל</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="username" className="form-label">שם משתמש</label>
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
//           <label htmlFor="password" className="form-label">סיסמה</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">התחבר</button>
//       </form>
//       {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
//     </div>
//   );
// };

// export default LoginAdmin;
