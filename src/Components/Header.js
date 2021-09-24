import React from 'react'
import styles from './Header.module.css';
import { Link } from 'react-router-dom'
import {ReactComponent as Dogs} from '../Assets/dogs.svg';

const Header = () => {
  return (
    <header className={styles.header}>
       <nav className={`container ${styles.nav}`}>
        <Link to='/' className={styles.logo} aria-label='Fogs - Home'>
          <Dogs />
        </Link>
        <Link to='/login' className={styles.login}>Login / Criar Login</Link>

      </nav>
    </header>
  )
}

export default Header
