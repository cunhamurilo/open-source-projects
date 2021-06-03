import React, { useState, useEffect } from 'react'

import Header from '../../components/Header'
import MovieList from '../../components/MovieList'
import Modal from '../../components/Modal'

import './styles.css'

export default function Home() {
  const [pageScroll, setPageScroll] = useState(false)
  const [show, setShow] = useState(false);
  const [featuredMovie, setFeaturedMovie] = useState(null)

  const [menuState, setMenuState] = useState("Inicio")

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
      <Header scroll={pageScroll} state={menuState} setState={setMenuState}/>
      <MovieList state ={menuState} setState={setMenuState} setShow={setShow} featuredMovie={featuredMovie} setFeaturedMovie={setFeaturedMovie}/>

      <Modal title="My Modal" onClose={() => setShow(false)} show={show} featuredMovie={featuredMovie}>
        <p>This is modal body</p>
      </Modal>
    </>
  )
}