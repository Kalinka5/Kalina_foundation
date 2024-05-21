import React from "react";
import "../css/payment.css";

class Payment extends React.Component {
  render() {
    return (
      <div className="payment">
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
        <div className="block row1">
          <div className="description">
            <h2>Ви також можете зробити свій внесок через банку Фонду</h2>
            <a
              href="https://send.monobank.ua/jar/QsATQ1NQ4"
              target="_blank"
              rel="noreferrer"
            >
              Монобанка
            </a>
          </div>
        </div>
        <div className="block">
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
                <p>5244</p>
                <p>2150</p>
                <p>8252</p>
                <p>6420</p>
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
        <div className="block">
          <div className="description">
            <label>Одержувач</label>
            <input
              className="number"
              type="text"
              defaultValue="Данііл Каліневич"
            />
            <label>IBAN</label>
            <input
              className="number"
              type="text"
              defaultValue="UA843052990000026200681993072"
            />
            <label>РНОКПП</label>
            <input
              className="inputname"
              type="text"
              defaultValue="2975800618"
            />
            <label>Призначення платежу</label>
            <input
              className="expire"
              type="text"
              defaultValue="Благодійний безповоротний внесок"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Payment;
