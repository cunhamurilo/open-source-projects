import React from "react";
import "./styles.css";

import FeaturedMovie from "../FeaturedMovie";
import { AiFillCloseCircle } from "react-icons/ai"

const Modal = props => {
    // Check if exists data
    if(!props.show || !props.featuredMovie)
        return null

    // Get year of movie
    const movieYearDate = new Date(props.featuredMovie.release_date || props.featuredMovie.first_air_date)

    // Get description about movie
    let description = props.featuredMovie.overview
    if (description.length > 200) {
        description = description.substring(0, 200) + ' ...'
    }
    
    // Convert seconds in string time 
    function time (input) {
        var pad = function(input) {return input < 10 ? "0" + input : input;};
        let hour = pad(Math.floor(input / 60))
        let minutes = pad(Math.floor(input % 60 )) 
        return `${hour}h${minutes}min`  
    }
    
    return (
        <section className={`modal-container`}>
            <div className="modal" onClick={props.onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    {/* Featured layout about movie */}
                    <div className="modal-header">
                        <FeaturedMovie movie={props.featuredMovie} setShow={false} imageMedium={true}/>
                    </div>
                    {/* Button exit modal */}
                    <div className="modal-body" onClick={props.onClose}>
                        <AiFillCloseCircle size="40"/>
                    </div>
                    <div className="modal-footer">
                        {/* Set more information about movie */}
                        <div className="footer-bigger">
                            <div className="info-wrapper-flex">
                                <div className="featured-movie-message">
                                    {props.featuredMovie.vote_average} pontos
                                </div>
                                <div className="featured-movie-year info-text">
                                    {movieYearDate.getFullYear()}
                                </div>
                                <div className="featured-movie-seasons info-text">
                                    {props.featuredMovie.number_of_seasons ?
                                    props.featuredMovie.number_of_seasons !== 1 ? `${props.featuredMovie.number_of_seasons} seasons` : `${props.featuredMovie.number_of_seasons} season` :""}
                                </div>
                                <div className="featured-movie-time info-text">
                                    {props.featuredMovie.number_of_seasons ?
                                    "": time(props.featuredMovie.runtime)}
                                </div>
                            </div>
                            <div className="featured-movie-synopsis">
                                <div className="synopsis-text">
                                    {description}
                                </div>
                            </div>
                        </div>
                        {/* Set more information about movie */}
                        <div className="footer-minor">
                            <div>
                                <p>Genres: </p>
                                {props.featuredMovie.genres.map((element, index) => {
                                    let text = element.name
                                    if(index < props.featuredMovie.genres.length -1){
                                        text+=", "
                                    }
                                    return (<div>{text}</div>)
                                })}
                            </div>
                            <div>
                                <p>Language: </p>
                                <div>{props.featuredMovie.original_language}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Modal;
