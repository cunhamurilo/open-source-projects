import React, { useEffect, useState } from 'react'

import api from '../../services/api'

// import MovieListCard from '../MovieListCard'
import FeaturedMovie from '../FeaturedMovie'

import './styles.css'

export default function MovieList({ state }) {
  const [movieList, setMovieList] = useState(null)
  const [featuredMovie, setFeaturedMovie] = useState(null)

  useEffect(() => {
    // load data from db
    async function loadMovieList() {
      let response = []

      if(state === "Filmes")
        response = await api.getDataByType("movie")
      else if(state === "Séries")
        response = await api.getDataByType("tv")
      else if(state === "Inicio")
        response = await api.getAllData("tv")

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

      console.log('movieChosen',movieChosen)
      console.log(movieChosen.media_type, state)

      const chosenInformation = await api.getMovieInformation(
        movieChosen.id,
        movieChosen.media_type !== null ? movieChosen.media_type: state
      )

      console.log(chosenInformation.info)

      setFeaturedMovie(chosenInformation.info)
    }

    if (movieList !== null) {
      loadFeaturedMovie()
    }
  }, [movieList])

  return (
    <>
      {!!featuredMovie && <FeaturedMovie movie={featuredMovie} />}
      {/* 
      <section className="movie-list-section">
        {!!movieList &&
          movieList.map((item, key) => (
            <div key={key} className="movie-list-card">
              <MovieListCard
                title={item.title}
                movies={item.movies}
                slug={item.slug}
              />
            </div>
          ))}
      </section> */}
    </>
  )
}
