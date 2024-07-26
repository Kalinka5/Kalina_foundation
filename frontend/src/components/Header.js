import React from "react";

import "../styles/header.css";

class Header extends React.Component {
  render() {
    return (
      <header>
        <div className="logo">
          <a href="/home/1">
            <span>Kalina</span> <span>Foundation</span>
          </a>
        </div>
        <div className="nav">
          <ul>
            {this.props.links.map((el) => (
              <li key={el.id}>
                <a href={el.urlLink}>{el.urlName}</a>
              </li>
            ))}
          </ul>
        </div>
      </header>
    );
  }
}

export default Header;
