import React, { useState } from "react";

import { IoIosHelpCircle, IoIosBrowsers, IoIosCheckmark } from "react-icons/io";

import { useMediaQuery } from "@uidotdev/usehooks";

import "../styles/payment.css";

function Payment() {
  const isMobile = useMediaQuery("only screen and (max-width: 479px)");
  const [bankChange, setbankChange] = useState(false);

  const recipient = "Каліневич Данііл Олександрович";
  const iban = "UA863052990000026201737711936";
  const inn = "3765604679";
  const title = "Благодійний безповоротний внесок";

  const [recCoppied, setRecCoppied] = useState(false);
  const [ibanCoppied, setIbanCoppied] = useState(false);
  const [innCoppied, setInnCoppied] = useState(false);
  const [titleCoppied, setTitleCoppied] = useState(false);

  const clickCopyRec = () => {
    navigator.clipboard.writeText(recipient);
    setRecCoppied(true);
    setInterval(function () {
      setRecCoppied(false);
    }, 5000);
  };
  const clickCopyIban = () => {
    navigator.clipboard.writeText(iban);
    setIbanCoppied(true);
    setInterval(function () {
      setIbanCoppied(false);
    }, 5000);
  };
  const clickCopyInn = () => {
    navigator.clipboard.writeText(inn);
    setInnCoppied(true);
    setInterval(function () {
      setInnCoppied(false);
    }, 5000);
  };
  const clickCopyTitle = () => {
    navigator.clipboard.writeText(title);
    setTitleCoppied(true);
    setInterval(function () {
      setTitleCoppied(false);
    }, 5000);
  };

  const ChangeToMono = async (e) => {
    setbankChange(true);
  };
  const ChangeToPrivat = async (e) => {
    setbankChange(false);
  };

  return (
    <div className="payment">
      {isMobile ? (
        <div className="container">
          <div className={`slider ${bankChange ? "moveslider" : ""}`}></div>
          <div className="btn">
            <button
              className={`mono ${bankChange ? "" : "mono-slider"}`}
              onClick={ChangeToPrivat}
            >
              Monobank
            </button>
            <button
              className={`privat ${bankChange ? "privat-slider" : ""}`}
              onClick={ChangeToMono}
            >
              Privatbank
            </button>
          </div>
          <div
            className={`grid-part form-section ${
              bankChange ? "form-section-move" : ""
            }`}
          >
            <div className="block row1">
              <div className="container-mastercard">
                <div className="front-card front-hov">
                  <div className="column1">
                    <h3 id="main-title">
                      monobank | <span>Universal Bank</span>
                    </h3>
                    <div id="chip"></div>
                    <div className="card-info">
                      <p id="no">5375 4141 2253 7789</p>
                      <div className="grid-date">
                        <p id="name">Daniil Kalinevych</p>
                        <p id="exp-date">dd/yy</p>
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
            <div className="block row1">
              <div className="container-visa">
                <div className="front front-hov">
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
                    <p>dd / yy</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="visa-desc" className="description">
              <div>
                <label>Одержувач</label>
                <div className="input-box">
                  <input
                    className="number"
                    type="text"
                    defaultValue={recipient}
                    disabled
                    readOnly
                  />
                  <span className="copy-toggle-icon" onClick={clickCopyRec}>
                    {recCoppied ? (
                      <i className="checkmark">
                        <IoIosCheckmark />
                      </i>
                    ) : (
                      <i className="copy">
                        <IoIosBrowsers />
                      </i>
                    )}
                  </span>
                </div>
              </div>
              <div>
                <label>IBAN</label>
                <div className="input-box">
                  <input
                    className="number"
                    type="text"
                    defaultValue={iban}
                    disabled
                    readOnly
                  />
                  <span className="copy-toggle-icon" onClick={clickCopyIban}>
                    {ibanCoppied ? (
                      <i className="checkmark">
                        <IoIosCheckmark />
                      </i>
                    ) : (
                      <i className="copy">
                        <IoIosBrowsers />
                      </i>
                    )}
                  </span>
                </div>
              </div>
              <div>
                <label>РНОКПП</label>
                <div className="input-box">
                  <input
                    className="inputname"
                    type="text"
                    defaultValue={inn}
                    disabled
                    readOnly
                  />
                  <span className="copy-toggle-icon" onClick={clickCopyInn}>
                    {innCoppied ? (
                      <i className="checkmark">
                        <IoIosCheckmark />
                      </i>
                    ) : (
                      <i className="copy">
                        <IoIosBrowsers />
                      </i>
                    )}
                  </span>
                </div>
              </div>
              <div>
                <label>Призначення платежу</label>
                <div className="input-box">
                  <input
                    className="expire"
                    type="text"
                    defaultValue={title}
                    disabled
                    readOnly
                  />
                  <span className="copy-toggle-icon" onClick={clickCopyTitle}>
                    {titleCoppied ? (
                      <i className="checkmark">
                        <IoIosCheckmark />
                      </i>
                    ) : (
                      <i className="copy">
                        <IoIosBrowsers />
                      </i>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2 id="cards-title">
            Ми маємо дві картки на які ви можете задонатити
          </h2>
          <div className="donater-info">
            <div className="icon-background">
              <i className="tooltip-icon">
                <IoIosHelpCircle />
              </i>
            </div>
            <span className="tooltiptext">
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
            </span>
          </div>
          <div className="grid-part">
            <div className="block row1">
              <div className="container-mastercard">
                <div className="front-card front-hov">
                  <div className="column1">
                    <h3 id="main-title">
                      monobank | <span>Universal Bank</span>
                    </h3>
                    <div id="chip"></div>
                    <div className="card-info">
                      <p id="no">5375 4141 2253 7789</p>
                      <div className="grid-date">
                        <p id="name">Daniil Kalinevych</p>
                        <p id="exp-date">dd/yy</p>
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
                <div className="front front-hov">
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
                    <p>dd / yy</p>
                  </div>
                </div>
              </div>
            </div>
            <div id="visa-desc" className="description">
              <div>
                <label>Одержувач</label>
                <div className="input-box">
                  <input
                    className="number"
                    type="text"
                    defaultValue={recipient}
                    disabled
                    readOnly
                  />
                  <span className="copy-toggle-icon" onClick={clickCopyRec}>
                    {recCoppied ? (
                      <i className="checkmark">
                        <IoIosCheckmark />
                      </i>
                    ) : (
                      <i className="copy">
                        <IoIosBrowsers />
                      </i>
                    )}
                  </span>
                </div>
              </div>
              <div>
                <label>IBAN</label>
                <div className="input-box">
                  <input
                    className="number"
                    type="text"
                    defaultValue={iban}
                    disabled
                    readOnly
                  />
                  <span className="copy-toggle-icon" onClick={clickCopyIban}>
                    {ibanCoppied ? (
                      <i className="checkmark">
                        <IoIosCheckmark />
                      </i>
                    ) : (
                      <i className="copy">
                        <IoIosBrowsers />
                      </i>
                    )}
                  </span>
                </div>
              </div>
              <div>
                <label>РНОКПП</label>
                <div className="input-box">
                  <input
                    className="inputname"
                    type="text"
                    defaultValue={inn}
                    disabled
                    readOnly
                  />
                  <span className="copy-toggle-icon" onClick={clickCopyInn}>
                    {innCoppied ? (
                      <i className="checkmark">
                        <IoIosCheckmark />
                      </i>
                    ) : (
                      <i className="copy">
                        <IoIosBrowsers />
                      </i>
                    )}
                  </span>
                </div>
              </div>
              <div>
                <label>Призначення платежу</label>
                <div className="input-box">
                  <input
                    className="expire"
                    type="text"
                    defaultValue={title}
                    disabled
                    readOnly
                  />
                  <span className="copy-toggle-icon" onClick={clickCopyTitle}>
                    {titleCoppied ? (
                      <i className="checkmark">
                        <IoIosCheckmark />
                      </i>
                    ) : (
                      <i className="copy">
                        <IoIosBrowsers />
                      </i>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
