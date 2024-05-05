import { Link } from 'react-router-dom'
import { useState } from 'react'
import Button from '../button/button'
import styles from './header.module.scss'

const Header = () => {

    const [navLinks] = useState([
        {id: 1, path: '/', text: 'Sobre'},
        {id: 2, path: '/', text: 'Funcionalidades'},
    ])
  
    return (
        <header>
            <Link to='/'> <h1>DC</h1> </Link>
            <nav className={styles.navLinks}>
                <ul>
                    {navLinks.map((item) => (
                        <li key={item.id}>
                            <Link to={item.path}>
                                <span>{item.text}</span>
                            </Link>
                        </li>    
                    ))}
                </ul>
            </nav>
            <nav className={styles.navButtons}>
                <Button text='login' />
                <Button text='cadastre-se' />
            </nav>
        </header>
  )
}

export default Header
