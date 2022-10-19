import React from "react";
import pic from "./github_icon.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faMailBulk } from '@fortawesome/free-solid-svg-icons'

const InfoPart = () => {
    return(
        <div className="infopart">
            <img className="pic" src={ pic } alt="" />
            <h1 id="name">Vajda Marcell</h1>
            <h4 id="profession">Fullstack Developer</h4>
            <p id="email">vajdam96@gmail.com</p>
            <div id="button-box">
                <button id="mail-button"><FontAwesomeIcon icon={faMailBulk} id="icon" /><h4>Email</h4></button>
                <button id="linkedin-button"><FontAwesomeIcon icon={faLinkedin} id="icon" /><h4>LinkedIn</h4></button>
            </div>
        </div>
    );
}

export default InfoPart;