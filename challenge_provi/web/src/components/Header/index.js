import React from 'react'

import './styles.css'
import logo from '../../assets/images/netflix-logo.png'
import avatar from '../../assets/images/netflix-avatar.png'

import { FiSearch } from 'react-icons/fi';
import { GoTriangleDown } from 'react-icons/go';

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

  return (
    <section className={`header-movie ${scroll ? 'page-scroll' : ''}`}>
      <div className="header-movie-container">
        <div className="main-header menu-navigation display-flex-space-between">
          <div className="display-flex">
            {/* Netflix logo */}
            <a className="logo" href="a">
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
                    <a href="." className={state === item.title ? 'current':''} onClick={menuClickButton} >
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
                    <GoTriangleDown />
                  </span>
                  <ul className='ul-navigation-account'>
                    <li key="user" className="ul-navigation-tab-account">
                      <a href="a" >
                        name
                      </a>
                    </li>
                    <li key="exit" className="ul-navigation-tab-account">
                      <a href='a' >
                        Exit Netflix
                      </a>
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