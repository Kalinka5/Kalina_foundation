import React from "react";

import { IoIosHelpCircle } from "react-icons/io";

import "../styles/payment.css";

class Payment extends React.Component {
  render() {
    return (
      <div className="payment">
        <h2 id="cards-title">
          Ми маємо дві картки на які ви можете задонатити
        </h2>
        <div className="donater-info">
          <i className="icon">
            <IoIosHelpCircle />
          </i>
          <div className="show-info">
            <p>
              Щоб відображатись на головній сторінці у Топ донатерах, потрібно:{" "}
              <br />
              <br />
              1) зареєструватись та залогінитись на нашому веб-сайті;
              <br />
              <br />
              2) в описі донату зазначити{" "}
              <b>
                <i>username</i>
              </b>{" "}
              вашого створенного акаунту.
            </p>
          </div>
        </div>
        <div className="grid-part">
          <div className="block row1">
            <div className="container-mastercard">
              <div className="front-card">
                <div className="column1">
                  <h3 id="main-title">
                    monobank | <span>Universal Bank</span>
                  </h3>
                  <div id="chip"></div>
                  <div className="card-info">
                    <p id="no">5375 4141 2253 7789</p>
                    <div className="grid-date">
                      <p id="name">Daniil Kalinevych</p>
                      <p id="exp-date">07/26</p>
                    </div>
                  </div>
                </div>
                <div className="column2">
                  <i id="globe" className="fa fa-globe"></i>
                  <div id="mastercard"></div>
                </div>
              </div>
            </div>
          </div>
          <div id="mono-desc" className="description">
            <p id="monobanka-p">
              Ви також можете зробити свій внесок через банку Фонду
            </p>
            <a
              href="https://send.monobank.ua/jar/QsATQ1NQ4"
              target="_blank"
              rel="noreferrer"
            >
              Монобанка
            </a>
          </div>
          <div className="block center-mono">
            <h2>Monobank</h2>
          </div>
          <div className="block center-privat">
            <h2>Privatbank</h2>
          </div>
          <div className="block row1">
            <div className="container-visa">
              <div className="front">
                <img
                  src="https://i.ibb.co/PYss3yv/map.png"
                  className="map-img"
                  alt="Map"
                />
                <div className="row">
                  <img
                    src="https://i.ibb.co/G9pDnYJ/chip.png"
                    width="60px"
                    alt="Chip"
                  />
                  <img
                    src="https://i.ibb.co/WHZ3nRJ/visa.png"
                    width="60px"
                    alt="Visa"
                  />
                </div>
                <div className="row card-no">
                  <p>4149</p>
                  <p>4390</p>
                  <p>2438</p>
                  <p>4293</p>
                </div>
                <div className="row card-holder">
                  <p>CARD HOLDER</p>
                  <p>VALID TILL</p>
                </div>
                <div className="row name">
                  <p>Daniil Kalinevych</p>
                  <p>10 / 25</p>
                </div>
              </div>
            </div>
          </div>
          <div id="visa-desc" className="description">
            <div>
              <label>Одержувач</label>
              <input
                className="number"
                type="text"
                defaultValue="Данііл Каліневич"
                disabled
                readOnly
              />
            </div>
            <div>
              <label>IBAN</label>
              <input
                className="number"
                type="text"
                defaultValue="UA843052990000026200681993072"
                disabled
                readOnly
              />
            </div>
            <div>
              <label>РНОКПП</label>
              <input
                className="inputname"
                type="text"
                defaultValue="2975800618"
                disabled
                readOnly
              />
            </div>
            <div>
              <label>Призначення платежу</label>
              <input
                className="expire"
                type="text"
                defaultValue="Благодійний безповоротний внесок"
                disabled
                readOnly
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
