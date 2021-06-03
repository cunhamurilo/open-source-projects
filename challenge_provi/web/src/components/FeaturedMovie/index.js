import React from 'react'

import './styles.css'

import { GrPlayFill } from 'react-icons/gr';
import { AiFillInfoCircle } from 'react-icons/ai';


import { BsPlusCircle } from 'react-icons/bs';
import { BiLike } from 'react-icons/bi';
import { BiDislike } from 'react-icons/bi';

import logo from '../../assets/images/logo_unica_netflix.png'

export default function FeaturedMovie({ movie, setShow, imageMedium }) {

  // Check if overview is large and put ... for cut
  let description = movie.overview
  if (description.length > 200) {
    description = description.substring(0, 200) + ' ...'
  }
  
  return (
    <section className="featured-movie-section">
      <div className={imageMedium ? "featured-movie-row row-clear" : "featured-movie-row"}>
        {/* Panel with info about the movie or serie */}
        <div className={imageMedium ? "featured-movie-panel medium-panel":"featured-movie-panel"}>
          {/* Insert image in panel */}
          <div className="featured-movie-motion">
            <div className="bottom-layer full-screen">
              <div className={imageMedium ? "wrapper-medium image-wrapper" : "image-wrapper"} >
                <img
                  src={`http://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.name}
                  className="static-image image-layer"
                />
              </div>
            </div>
          </div>

          {/* Info about the movie or serie */}
          <div className="fill-container">
            <div className="featured-movie-info">
              <div className="logo-and-text">

                {/* Show logo netflix with type of movie or serie */}
                <div className="info-wrapper">
                  <div className="info-wrapper-flex">
                    <div className="featured-logo" >
                      <img src={logo} alt="Netflix"></img>
                    </div>
                    <div className="featured-movie-type">
                      {movie.number_of_seasons !== undefined ?
                         `Season` : `Movie`
                      } 
                    </div>
                  </div>
                </div>

                {/* Show information about the movie or series like title, description and number of seasons*/}
                <div className="title-wrapper">
                  <div className={imageMedium ? "wrapper-medium featured-movie-title" : "featured-movie-title"}>
                    {movie.original_title || movie.original_name}
                  </div>
                </div>

                <div className="info-wrapper">
                  <div className="info-wrapper-flex">
                    <div className="featured-movie-seasons info-text">
                      {movie.number_of_seasons !== undefined ?
                        movie.number_of_seasons !== 1 ? `Watch now the ${movie.number_of_seasons} seasons` : `Watch now the ${movie.number_of_seasons} season` : ""
                      } 
                    </div>
                  </div>
                  {imageMedium ? "":
                  <div className="featured-movie-synopsis">
                    <div className="synopsis-text">{description}</div>
                  </div>}
                </div>

                {/* Buttons for watch and more information */}
                <div className="featured-movie-links button-layer">
                  <button className="button-main color-primary has-label has-icon">
                    <div className="icon-main icon-medium">
                      <GrPlayFill />
                    </div>

                    <div className="icon-text">Watch</div>
                  </button>

                  { !imageMedium ?  
                    <button className="button-main color-secondary has-label has-icon">
                      <div className="icon-main icon-medium">
                        <AiFillInfoCircle />
                      </div>
                        <div className="icon-text" onClick={() => setShow(true)}>More information</div>
                    </button> :
                    <ul className="button-main-rounded color-secondary has-label has-icon" >
                      <li className="rounded" >
                        <BsPlusCircle size="40" />
                      </li>
                      <li className="rounded" >
                        <BiLike size="28" />
                      </li>
                      <li className="rounded" >
                        <BiDislike size="28" />
                      </li>
                    </ul>
                   }
                </div>

              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
