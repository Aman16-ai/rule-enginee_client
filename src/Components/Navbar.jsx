import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <h1 style={styles.logoText}>Rule Engine</h1>
      </div>
      <ul style={styles.navLinks}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.navLink}>
            Create Rule
          </Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/evaluate-user" style={styles.navLink}>
            Evaluate User
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#3498DB',
    color: '#fff',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    fontFamily: "'Inter', sans-serif",
  },
  logo: {
    flexGrow: 1,
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '700',
    letterSpacing: '1px',
    margin: 0,
  },
  navLinks: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    gap: '20px',
  },
  navItem: {
    display: 'flex',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: '500',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
  },
};

export default Navbar;
