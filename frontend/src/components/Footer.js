import React from "react";

import {
  IoLogoGithub,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoYoutube,
} from "react-icons/io";

import "../styles/footer.css";

class Footer extends React.Component {
  render() {
    return (
      <div className="pg-footer">
        <footer
          className={`footer ${this.props.back === "ua" ? "ua" : "dot-white"}`}
        >
          <div className="footer-content">
            <div className="footer-social-links">
              {" "}
              <svg
                className="footer-social-amoeba-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 236 54"
              >
                <path
                  className="footer-social-amoeba-path"
                  d="M223.06,43.32c-.77-7.2,1.87-28.47-20-32.53C187.78,8,180.41,18,178.32,20.7s-5.63,10.1-4.07,16.7-.13,15.23-4.06,15.91-8.75-2.9-6.89-7S167.41,36,167.15,33a18.93,18.93,0,0,0-2.64-8.53c-3.44-5.5-8-11.19-19.12-11.19a21.64,21.64,0,0,0-18.31,9.18c-2.08,2.7-5.66,9.6-4.07,16.69s.64,14.32-6.11,13.9S108.35,46.5,112,36.54s-1.89-21.24-4-23.94S96.34,0,85.23,0,57.46,8.84,56.49,24.56s6.92,20.79,7,24.59c.07,2.75-6.43,4.16-12.92,2.38s-4-10.75-3.46-12.38c1.85-6.6-2-14-4.08-16.69a21.62,21.62,0,0,0-18.3-9.18C13.62,13.28,9.06,19,5.62,24.47A18.81,18.81,0,0,0,3,33a21.85,21.85,0,0,0,1.58,9.08,16.58,16.58,0,0,1,1.06,5A6.75,6.75,0,0,1,0,54H236C235.47,54,223.83,50.52,223.06,43.32Z"
                ></path>
              </svg>
              <a
                className="footer-social-link linkedin"
                href="https://www.linkedin.com/in/daniil-kalinevych-b75167266/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="hidden-link-text">Linkedin</span>
                <i className="icon">
                  <IoLogoLinkedin />
                </i>
              </a>
              <a
                className="footer-social-link instagram"
                href="https://www.instagram.com/d.kalinka03/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="hidden-link-text">Instagram</span>
                <i className="icon">
                  <IoLogoInstagram />
                </i>
              </a>
              <a
                className="footer-social-link youtube"
                href="https://www.youtube.com/channel/UCXt4d3VhM-km32MELM9HG6A"
                target="_blank"
                rel="noreferrer"
              >
                <span className="hidden-link-text">Youtube</span>
                <i className="icon">
                  <IoLogoYoutube />
                </i>
              </a>
              <a
                className="footer-social-link github"
                href="https://github.com/Kalinka5"
                target="_blank"
                rel="noreferrer"
              >
                <span className="hidden-link-text">Github</span>
                <i className="icon">
                  <IoLogoGithub />
                </i>
              </a>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="footer-copyright-wrapper">
              <p className="footer-copyright-text">
                <a
                  className="footer-copyright-link"
                  href="#Copyright"
                  target="_self"
                >
                  {" "}
                  ©2024. | Designed By: Daniil Kalinevych. | All rights
                  reserved.{" "}
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
