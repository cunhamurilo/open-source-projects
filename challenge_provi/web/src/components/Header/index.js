import React, { useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';

import './styles.css'
import logo from '../../assets/images/netflix-logo.png'
import avatar from '../../assets/images/netflix-avatar.png'

import { FiSearch } from 'react-icons/fi';
import { GoTriangleDown } from 'react-icons/go';

import AuthService from '../../services/api';

export default function Header({ scroll, state, setState, setSearch }) {

  const [username, setUsername] = useState('');
  const history = useHistory();

  // menu list
  const menuList = [
    { title: 'Inicio' },
    { title: 'Séries' },
    { title: 'Filmes' },
  ]

  // Change menu item clicked
  function menuClickButton(e){
    setState(e.target.innerText)
  }

  function handleSearch(){
    let nameValue = document.getElementById("search").value;
    setSearch(nameValue)
  }

  // Logout user
  function logoutUser (){
    AuthService.logout();

    const currentUser = AuthService.getCurrentUser();
    if (!currentUser){
      history.go(0);
    //     history.push('/');
    }
  }
  
  // Get current user
  useEffect(() => {

    const currentUser = AuthService.getCurrentUser();
    if (currentUser){
        setUsername(currentUser.username)
    }
        
  }, []);

  return (
    <section className={`header-movie ${scroll ? 'page-scroll' : ''}`}>
      <div className="header-movie-container">
        <div className="main-header menu-navigation display-flex-space-between">
          <div className="display-flex">
            {/* Netflix logo */}
            <a className="logo" href="/home">
              <img src={logo} alt="logo da Netflix" width="100" />
            </a>
            {/* Menu with itens */}
            <ul className="ul-navigation">
              <li className="ul-navigation-menu">
                <div className="menu-trigger">
                  Navegar
                  <GoTriangleDown />
                </div>
              </li>
              {/* Get itens from list and add to layout */}
              <div className='ul-navigation-tab-menu'>
              {!!menuList &&
                menuList.map((item, key) => (
                  <li key={key} className="ul-navigation-tab">
                    <div className={state === item.title ? 'current':''} onClick={menuClickButton} >
                      {item.title}
                    </div>
                  </li>
                ))}
              </div>
            </ul>
          </div>
          {/* Buttons for search a movie or serie */}
          <div className="secondary-navigation">
            <div className="nav-element">
              <div className="search-main">
                <div className="search-item">
                  <form onSubmit={handleSearch}>
                    <input type="search" id="search" placeholder="Title" onChange={handleSearch}/>
                    <i className="fa">
                      <FiSearch size="28"/>
                    </i>
                  </form>
                </div>
              </div>
            </div>
            {/* Buttons account */}
            <div className="nav-element">
              <span className="account-menu-item">
                <span className="account-dropdown-button">
                  <span className="profile-link">
                    <img src={avatar} alt="" className="profile-icon" />
                    <GoTriangleDown />
                  </span>
                  {/* Buttons submenu  */}
                  <ul className='ul-navigation-account'>
                    <li key="user" className="ul-navigation-tab-account">
                      <div >
                        {username}
                      </div>
                    </li>
                    <li key="exit" className="ul-navigation-tab-account">
                      <div onClick={logoutUser} >
                        Exit Netflix
                      </div>
                    </li>
                  </ul>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}