import React, { useState } from 'react'

import {
  FaChevronRight,
  FaChevronLeft,
  FaAngleRight,
} from 'react-icons/fa'

import './styles.css'

export default function MovieListCard({ title, movies  }) {
  const [sliderScrollX, setSliderScrollX] = useState(0)

  function handlePrev() {
    let scrollX = sliderScrollX + Math.round(window.innerWidth / 2)

    if (scrollX > 0) {
      scrollX = 0
    }

    setSliderScrollX(scrollX)
  }

  function handleNext() {
    let scrollX = sliderScrollX - Math.round(window.innerWidth / 2)
    let listItems = movies.length * 339

    if (window.innerWidth - listItems > scrollX) {
      scrollX = window.innerWidth - listItems
    }

    setSliderScrollX(scrollX)
  }

  return (
    <>
      <h2 className="movie-list-header">
        <a href="a" className="movie-list-title" >
          <div className="movie-list-header-title">{title}</div>

          <div className="arrow-row-header">
            <div className="see-all-link">Ver tudo</div>
            <FaAngleRight className="arrow-row-icon" />
          </div>
        </a>
      </h2>

      <div
        className={`movie-row-container movie-row-container-card row-panels`}
      >
        <div className="movie-row-content slider-hover-trigger-layer">
          <div className="slider">
            {!!sliderScrollX && (
              <span className="handle handle-prev active" onClick={handlePrev}>
                <b className="indicator-icon">
                  <FaChevronLeft />
                </b>
              </span>
            )}

            <div className="slider-mask show-peek">
              <div
                className="slider-content row-with-x-columns"
                style={{
                  marginLeft: sliderScrollX,
                  width: movies.length * 100,
                }}
              >
                {movies.map((item, index) => (
                  <div
                    className={`slider-item slider-item-${index}`}
                    key={index}
                  >
                    <div className="title-card-container">
                      <div className="title-card">
                        <div className="content">
                          <a href=".">
                            <div
                              className={`box-size-16x9 box-container box-rounded`}
                            >
                              <img
                                src={`http://image.tmdb.org/t/p/original${item.poster_path}`}
                                alt={item.name}
                                className="box-image box-image-in-padded-container"
                              />
                              <div className="fallback-text-container">
                                <p className="fallback-text">{item.name}</p>
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <span className="handle handle-next active" onClick={handleNext}>
              <b className="indicator-icon">
                <FaChevronRight />
              </b>
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
