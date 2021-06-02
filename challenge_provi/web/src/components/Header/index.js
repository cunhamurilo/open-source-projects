import React from 'react'

import './styles.css'
import logo from '../../assets/images/netflix-logo.png'
import avatar from '../../assets/images/netflix-avatar.png'

import { FiSearch } from 'react-icons/fi';

export default function Header({ scroll, state, setState }) {

  // menu list
  const menuList = [
    { title: 'Inicio' },
    { title: 'Séries' },
    { title: 'Filmes' },
  ]

  // Change menu item clicked
  function menuClickButton(e){
    setState(e.target.text)
  }

  function listMenu(){
    console.log('teste')
    let tab = document.getElementsByClassName('ul-navigation-tab');
    
  }

  return (
    <section className={`header-movie ${scroll ? 'page-scroll' : ''}`}>
      <div className="header-movie-container">
        <div className="main-header menu-navigation display-flex-space-between">
          <div className="display-flex">
            {/* Netflix logo */}
            <a className="logo" href=".">
              <img src={logo} alt="logo da Netflix" width="100" />
            </a>
            {/* Menu with itens */}
            <ul className="ul-navigation">
              <li className="ul-navigation-menu">
                <div className="menu-trigger" onClick={listMenu}>
                  Navegar
                </div>
              </li>
              {/* Get itens from list and add to layout */}
              <div className='ul-navigation-tab-menu'>
              {!!menuList &&
                menuList.map((item, key) => (
                  <li key={key} className="ul-navigation-tab">
                    <a className={state === item.title ? 'current':''} onClick={menuClickButton} >
                      {item.title}
                    </a>
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
                  <span className="icon-search">
                    <FiSearch />
                  </span>
                </div>
              </div>
            </div>
            {/* Button account */}
            <div className="nav-element">
              <span className="account-menu-item">
                <span className="account-dropdown-button">
                  <span className="profile-link">
                    <img src={avatar} alt="" className="profile-icon" />
                  </span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}