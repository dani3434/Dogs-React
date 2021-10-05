import React from 'react'
import { NavLink } from 'react-router-dom'
import { UserContext } from '../../UserContext';
import {ReactComponent as MinhasFotos} from '../../Assets/feed.svg';
import {ReactComponent as Estatisticas} from '../../Assets/estatisticas.svg';
import {ReactComponent as AdicionarFoto} from '../../Assets/adicionar.svg';
import {ReactComponent as Sair} from '../../Assets/sair.svg';
import styles from './UserHeaderNav.module.css';
import useMedia from '../../Hooks/useMedia';
import { useLocation } from 'react-router';


const UserHeaderNav = () => {
  const {userlogout} = React.useContext(UserContext);
  const mobile = useMedia('(max-width: 40rem)');
  const [mobileMenu,setMobileMenu] = React.useState(false);
  const {pathname} = useLocation()

  React.useEffect(() => {
    setMobileMenu(false)
  },[pathname])


  return (
    <React.Fragment>
     {mobile && <button aria-label='Menu' className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`} onClick={() => setMobileMenu(!mobileMenu)}></button>}

      <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
        <NavLink to='/conta' end><MinhasFotos /> {mobile && 'Minhas Fotos'}</NavLink>
        <NavLink to='estatisticas'><Estatisticas />{mobile && 'Estatisticas'}</NavLink>
        <NavLink to='postar'><AdicionarFoto />{mobile && 'Adicionar Foto'}</NavLink>

        <button onClick={userlogout}><Sair />{mobile && 'Sair'}</button>
      </nav>
    </React.Fragment>
  )
}

export default UserHeaderNav
