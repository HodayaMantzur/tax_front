import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav style={styles.nav}>
      <ul style={styles.navList}>
        {/* קישור לעמוד הבית */}
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>בית</Link>
        </li>
        
        {/* קישור לכניסת מנהל */}
        <li style={styles.navItem}>
          <Link to="/admin-login" style={styles.navLink}>כניסת מנהל</Link>
        </li>
        
        {/* קישור לכניסת לקוח */}
        <li style={styles.navItem}>
          <Link to="/client-login" style={styles.navLink}>כניסת לקוח</Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    background: '#f4f4f4',
    padding: '1rem',
  },
  navList: {
    listStyleType: 'none',
    display: 'flex',
    justifyContent: 'space-around',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#333',
  },
};

export default NavigationBar;




// import React from 'react';
// import { Navbar, Nav, Container } from 'react-bootstrap';
// import { Link } from 'react-router-dom';

// const NavigationBar = () => {
//   return (
//     <Navbar bg="dark" variant="dark" expand="lg">
//       <Container>
//         <Navbar.Brand as={Link} to="/">הבית</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ml-auto">
//             <Nav.Link as={Link} to="/admin-login">כניסת מנהל</Nav.Link>
//             <Nav.Link as={Link} to="/client-login">כניסת לקוח</Nav.Link>
//             <Nav.Link as={Link} to="/client-list">לקוחות</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// };

// export default NavigationBar;
