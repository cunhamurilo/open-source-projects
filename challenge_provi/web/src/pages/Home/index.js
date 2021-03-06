import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header'
import MovieList from '../../components/MovieList'
import Modal from '../../components/Modal'

import './styles.css'

import AuthService from '../../services/api';

export default function Home() {
  const [pageScroll, setPageScroll] = useState(false)
  const [show, setShow] = useState(false);
  const [featuredMovie, setFeaturedMovie] = useState(null)
  const [search, setSearch] = useState(null)

  const [menuState, setMenuState] = useState("Inicio")

  const history = useHistory();

  // Check if user already logged
  useEffect(() => {

    const currentUser = AuthService.getCurrentUser();
    if (!currentUser){
      history.push('/')
    }
        
  }, [history]);

  // Scroll page
  useEffect(() => {
    function scrollListener() {
      if (window.scrollY > 10) {
        setPageScroll(true)
      } else {
        setPageScroll(false)
      }
    }

    window.addEventListener('scroll', scrollListener)

    return () => {
      window.removeEventListener('scroll', scrollListener)
    }
  }, [])

  return (
    <>
      <Header scroll={pageScroll} state={menuState} setState={setMenuState} setSearch={setSearch}/>
      <MovieList state ={menuState} setState={setMenuState} setShow={setShow} search={search} featuredMovie={featuredMovie} setFeaturedMovie={setFeaturedMovie}/>

      <Modal title="My Modal" onClose={() => setShow(false)} show={show} featuredMovie={featuredMovie}>
        <p>This is modal body</p>
      </Modal>
    </>
  )
}