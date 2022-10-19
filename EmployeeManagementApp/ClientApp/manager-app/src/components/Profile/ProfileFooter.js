import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubSquare, faTwitterSquare, faInstagramSquare, faFacebookSquare } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
    return(
        <div className="profile-footer">
            <FontAwesomeIcon icon={faTwitterSquare} className="profile-footer-icon" />
            <FontAwesomeIcon icon={faFacebookSquare} className="profile-footer-icon" />
            <FontAwesomeIcon icon={faInstagramSquare} className="profile-footer-icon" />
            <FontAwesomeIcon icon={faGithubSquare} className="profile-footer-icon" />
        </div>
    );
}

export default Footer;