import React from "react";
import "./styles.css";

import FeaturedMovie from "../FeaturedMovie";
import { AiFillCloseCircle } from "react-icons/ai"

const Modal = props => {

    if(!props.show)
        return null

    return (
        <section className={`modal-container`}>
            <div className="modal" onClick={props.onClose}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <div className="modal-header">
                        <FeaturedMovie movie={props.featuredMovie} setShow={false} imageMedium={true}/>
                    </div>
                    <div className="modal-body">
                        
                        <AiFillCloseCircle size="40"/>
                    </div>
                    <div className="modal-footer">
                        {props.featuredMovie.id}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Modal;
