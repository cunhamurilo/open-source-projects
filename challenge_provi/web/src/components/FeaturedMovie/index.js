import React from 'react'

import './styles.css'

import { GrPlayFill } from 'react-icons/gr';
import { AiFillInfoCircle } from 'react-icons/ai';

export default function FeaturedMovie({ movie }) {

  const movieYearDate = new Date(movie.release_date || movie.last_air_date)

  let description = movie.overview
  if (description.length > 200) {
    description = description.substring(0, 200) + ' ...'
  }

  return (
    <section className="featured-movie-section">
      <div className="featured-movie-row">
        <div className="featured-movie-panel">
          <div className="featured-movie-motion">
            <div className="bottom-layer full-screen">
              <div className="image-wrapper">
                <img
                  src={`http://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.name}
                  className="static-image image-layer"
                />
              </div>
            </div>
          </div>

          <div className="fill-container">
            <div className="featured-movie-info">
              <div className="logo-and-text">
                <div className="title-wrapper">
                  <div className="featured-movie-title">
                    {movie.original_title || movie.original_name}
                  </div>
                </div>

                <div className="info-wrapper">
                  <div className="info-wrapper-flex">
                    <div className="featured-movie-message">
                      {movie.vote_average} pontos
                    </div>

                    <div className="featured-movie-year info-text">
                      {movieYearDate.getFullYear()}
                    </div>

                    <div className="featured-movie-seasons info-text">
                    {movie.number_of_seasons !== undefined ?
                      movie.number_of_seasons !== 1 ? `${movie.number_of_seasons} temporadas` : `${movie.number_of_seasons} temporada` : ""
                    } 
                    </div>
                  </div>

                  <div className="featured-movie-synopsis">
                    <div className="synopsis-text">{description}</div>
                  </div>
                </div>

                <div className="featured-movie-links button-layer">
                  <a href="#">
                    <button className="button-main color-primary has-label has-icon">
                      <div className="icon-main icon-medium">
                        <GrPlayFill />
                      </div>

                      <div className="icon-text">Assistir</div>
                    </button>
                  </a>

                  <button className="button-main color-secondary has-label has-icon">
                    <div className="icon-main icon-medium">
                      <AiFillInfoCircle />
                    </div>

                    <div className="icon-text">Mais informações</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
