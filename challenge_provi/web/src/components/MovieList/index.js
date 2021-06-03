import React, { useEffect, useState } from 'react'

import api from '../../services/api'

import MovieListCard from '../MovieListCard'
import FeaturedMovie from '../FeaturedMovie'

import './styles.css'

export default function MovieList({ state, setShow, featuredMovie, setFeaturedMovie }) {
  const [movieList, setMovieList] = useState(null)

  useEffect(() => {
    // load data from db
    async function loadMovieList() {
      let response = []

      if(state === "Filmes")
        response = await api.getDataByType("movie")
      else if(state === "Séries")
        response = await api.getDataByType("tv")
      else if(state === "Inicio")
        response = await api.getAllData()

      setMovieList(response)
    }

    loadMovieList()
  }, [state])

  useEffect(() => {
    async function loadFeaturedMovie() {
      
      const movieChosenRandom = Math.floor(
        Math.random() * (movieList.data.length - 1)
      )

      const movieChosen = movieList.data[movieChosenRandom]

      let aux = "tv"
      if(state === "Filmes")
        aux = "movie"

      const chosenInformation = await api.getMovieInformation(
        movieChosen.id,
        movieChosen.media_type !== undefined ? movieChosen.media_type: aux
      )

      setFeaturedMovie(chosenInformation.info)
    }

    if (movieList !== null) {
      loadFeaturedMovie()
    }
  }, [movieList,state])

  return (
    <>
      {!!featuredMovie && <FeaturedMovie movie={featuredMovie} setShow={setShow}/>}
      
      <section className="movie-list-section">
        {!!movieList && 
           
             <div className="movie-list-card">
               <MovieListCard
                 title={"Highlights"}
                 movies={movieList.data}
               />
             </div>
        }
      </section>
    </>
  )
}
