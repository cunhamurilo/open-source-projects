import React, { useEffect, useState } from 'react'

import api from '../../services/api'

import MovieListCard from '../MovieListCard'
import FeaturedMovie from '../FeaturedMovie'

import './styles.css'

export default function MovieList({ state, setShow, featuredMovie, search, setFeaturedMovie }) {
  const [movieList, setMovieList] = useState(null)

  // Load data from db  
  useEffect(() => {
    async function loadMovieList() {
      let response = []

      // Check if contains text in search field
      if(state === "Filmes"){
        if(search !== null && search !== "")
          response = await api.getSearchData("movie", search)
        else
          response = await api.getDataByType("movie")
      }else if(state === "Séries"){
        if(search !== null && search !== "")
          response = await api.getSearchData("tv", search)
        else
          response = await api.getDataByType("tv")
      }else if(state === "Inicio"){
        if(search !== null && search !== "")
          response = await api.getSearchData("movie", search)
        else
          response = await api.getAllData()
      }
      
      setMovieList(response)
    }

    loadMovieList()
  }, [state, search])

  // Choose on movie random for the featured layout 
  useEffect(() => {
    async function loadFeaturedMovie() {
      // choose random value from lenght movies list  
      const movieChosenRandom = Math.floor(
        Math.random() * (movieList.data.length - 1)
      )

      // Get the movie
      const movieChosen = movieList.data[movieChosenRandom]
      let aux = "tv"
      if(state === "Filmes")
        aux = "movie"

      // Get the info about the movie 
      const chosenInformation = await api.getMovieInformation(
        movieChosen.id,
        movieChosen.media_type !== undefined ? movieChosen.media_type: aux
      )

      setFeaturedMovie(chosenInformation.info)
    }
    function setFeaturedMovieNull() {
      setFeaturedMovie(null)
    }

    if (movieList !== null && (search === null || search === "") ) {
      loadFeaturedMovie()
    }else{
      setFeaturedMovieNull()
    }
  }, [movieList,state, search])

  return (
    <>
      {/* Set layout about featured movie */}
      {!!featuredMovie && <FeaturedMovie movie={featuredMovie} setShow={setShow}/>}
      {/* Set list of card with movies */}
      <section className={featuredMovie ? "movie-list-section": "movie-list-section list-section-margin"}>
        {!!movieList && 
             <div className="movie-list-card">
               <MovieListCard
                 title={featuredMovie && "Highlights"}
                 movies={movieList.data}
               />
             </div>
        }
      </section>
    </>
  )
}
