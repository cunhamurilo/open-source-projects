import React from 'react'

import './styles.css'
import logo from '../../assets/images/netflix-logo.png'
import avatar from '../../assets/images/netflix-avatar.png'

import { FiSearch } from 'react-icons/fi';

export default function Header({ scroll, state, setState }) {
  
  const menuList = [
    { title: 'Inicio' },
    { title: 'Séries' },
    { title: 'Filmes' },
  ]

  function menuClickButton(e){
    setState(e.target.text)
  }

  return (
    <section className={`header-movie ${scroll ? 'page-scroll' : ''}`}>
      <div className="header-movie-container">
        <div className="main-header menu-navigation display-flex-space-between">
          <div className="display-flex">
            <a className="logo" href=".">
              <img src={logo} alt="logo da Netflix" width="100" />
            </a>

            <ul className="ul-navigation">
              <li className="ul-navigation-menu">
                <div className="menu-trigger">
                  Navegar
                </div>
              </li>

              {!!menuList &&
                menuList.map((item, key) => (
                  <li key={key} className="ul-navigation-tab">
                    <a className={state === item.title ? 'current':''} onClick={menuClickButton} >
                      {item.title}
                    </a>
                  </li>
                ))}
            </ul>
          </div>

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