import React, { useState } from "react";

import Select from "react-select";

import { Alert } from "antd";

import { ethers, parseEther } from "ethers";

import bnbLogo from "../img/bnb.svg";
import ethLogo from "../img/eth_logo.svg";

import api from "../api";

import "../styles/cryptoMethod.css";

// Options of Network Selection React Component
const options = [
  { value: "ETH", label: "Ethereum Mainnet", icon: ethLogo },
  { value: "BNB", label: "Binance Smart Chain", icon: bnbLogo },
];

// Styles for React Select Component (Network Eth or BNB)
const customStyles = {
  option: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    alignItems: "center",
  }),
};

// Constants and configurations for supported networks and currencies
export const CHAIN_IDS = {
  BINANCE: {
    NAME: "Binance",
    CURRENCY_CODE: "BNB",
    MAIN_NET: {
      ID: 56n,
    },
  },
  ETHEREUM: {
    NAME: "Ethereum",
    CURRENCY_CODE: "ETH",
    MAIN_NET: {
      ID: 1n,
    },
  },
};

export const MAXIMUM_DECIMAL_PLACES = 8;

// Function Component for the Crypto Payment Form
function CryptoPaymentForm(props) {
  const isAuth = props.isAuth;

  const [networkName, setNetworkName] = useState("Ethereum Mainnet");
  const [error, setError] = useState("");
  const [transaction, setTransaction] = useState(null);
  const [amount, setAmount] = useState(0);
  const [destinationAddress] = useState(
    "0xB55ffd71e7E9938c4e1972ea53B2294aCd145417"
  );
  const [currency, setCurrency] = useState("ETH");

  const onError = (message) => {};
  const onSuccess = (transaction) => {};

  let blockExplorerHost =
    currency === CHAIN_IDS.BINANCE.CURRENCY_CODE
      ? "bscscan.com"
      : "etherscan.io";

  const transactionUrl = transaction?.hash
    ? `https://${blockExplorerHost}/tx/${transaction.hash}`
    : "";
  let destinationAddressUrl = `https://${blockExplorerHost}/address/${destinationAddress}`;

  const changeNetwork = (selectedOption) => {
    setCurrency(selectedOption.value);
    setNetworkName(selectedOption.label);
  };

  const checkCorrectNetwork = (network) => {
    let expectedChainId;

    if (currency === CHAIN_IDS.ETHEREUM.CURRENCY_CODE) {
      expectedChainId = CHAIN_IDS.ETHEREUM.MAIN_NET.ID;
    } else if (currency === CHAIN_IDS.BINANCE.CURRENCY_CODE) {
      expectedChainId = CHAIN_IDS.BINANCE.MAIN_NET.ID;
    }

    if (network.chainId !== expectedChainId) {
      const actualNetworkName = "mainnet";
      const actualCurrency = [CHAIN_IDS.BINANCE.MAIN_NET.ID].includes(
        network.chainId
      )
        ? CHAIN_IDS.BINANCE.CURRENCY_CODE
        : CHAIN_IDS.ETHEREUM.CURRENCY_CODE;
      return {
        isCorrectNetwork: false,
        message: `Change your network in Metamask. Expected "mainnet" network (${networkName}) for currency: ${currency}. Instead received "${actualNetworkName}" network (${network.name}) for currency: ${actualCurrency}.`,
      };
    }
    return { isCorrectNetwork: true, message: "" };
  };

  const updateCryptoDonateAmount = (event) => {
    setAmount(parseFloat(event.target.value));
  };

  const handlePaymentSuccess = async () => {
    console.log(isAuth);
    let email;

    if (isAuth) {
      console.log("Start to sending a request to backend /profile");
      const res = await api.get("/profile");
      console.log("The request was sent successfully!");
      email = res.data.email;
      setUserEmail(email);
    } else {
      email = "Unknown Email";
      setUserEmail(email);
    }

    // Send the transaction data to the backend after ensuring userEmail is set
    await api
      .post("/donate/", {
        donate_type: currency,
        amount: amount,
        email: email,
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating donation", error);
      });
  };

  const startPayment = async (event) => {
    event.preventDefault();

    try {
      setError("");
      if (!window.ethereum) {
        throw new Error("No crypto wallet found. Please install it.");
      }

      // Request account access if needed
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Set up provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Ensure the network matches the desired network
      const network = await provider.getNetwork();
      const { isCorrectNetwork, message } = checkCorrectNetwork(network);

      if (!isCorrectNetwork) {
        throw new Error(message);
      }

      ethers.getAddress(destinationAddress);

      const transactionResponse = await signer.sendTransaction({
        to: destinationAddress,
        value: parseEther(amount.toFixed(MAXIMUM_DECIMAL_PLACES).toString()),
      });

      transactionResponse.network = network;
      transactionResponse.destinationAmount = amount.toString();

      setTransaction(transactionResponse);
      onSuccess(transactionResponse);

      await handlePaymentSuccess();
    } catch (err) {
      setError(err.message);
      onError(err.message);
      console.log({ error: err });
    }
  };

  return (
    <div className="CryptoPaymentForm">
      <div className="content">
        <div className="header">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 507.83 470.86"
            className="header-icon"
          >
            <defs>
              <style>
                {`.a{fill:#e2761b;stroke:#e2761b;}.a,.b,.c,.d,.e,.f,.g,.h,.i,.j{stroke-linecap:round;stroke-linejoin:round;}.b{fill:#e4761b;stroke:#e4761b;}.c{fill:#d7c1b3;stroke:#d7c1b3;}.d{fill:#233447;stroke:#233447;}.e{fill:#cd6116;stroke:#cd6116;}.f{fill:#e4751f;stroke:#e4751f;}.g{fill:#f6851b;stroke:#f6851b;}.h{fill:#c0ad9e;stroke:#c0ad9e;}.i{fill:#161616;stroke:#161616;}.j{fill:#763d16;stroke:#763d16;}`}
              </style>
            </defs>
            <title>metamask</title>
            <polygon
              className="a"
              points="482.09 0.5 284.32 147.38 320.9 60.72 482.09 0.5"
            />
            <polygon
              className="b"
              points="25.54 0.5 221.72 148.77 186.93 60.72 25.54 0.5"
            />
            <polygon
              className="b"
              points="410.93 340.97 358.26 421.67 470.96 452.67 503.36 342.76 410.93 340.97"
            />
            <polygon
              className="b"
              points="4.67 342.76 36.87 452.67 149.57 421.67 96.9 340.97 4.67 342.76"
            />
            <polygon
              className="b"
              points="143.21 204.62 111.8 252.13 223.7 257.1 219.73 136.85 143.21 204.62"
            />
            <polygon
              className="b"
              points="364.42 204.62 286.91 135.46 284.32 257.1 396.03 252.13 364.42 204.62"
            />
            <polygon
              className="b"
              points="149.57 421.67 216.75 388.87 158.71 343.55 149.57 421.67"
            />
            <polygon
              className="b"
              points="290.88 388.87 358.26 421.67 348.92 343.55 290.88 388.87"
            />
            <polygon
              className="c"
              points="358.26 421.67 290.88 388.87 296.25 432.8 295.65 451.28 358.26 421.67"
            />
            <polygon
              className="c"
              points="149.57 421.67 212.18 451.28 211.78 432.8 216.75 388.87 149.57 421.67"
            />
            <polygon
              className="d"
              points="213.17 314.54 157.12 298.04 196.67 279.95 213.17 314.54"
            />
            <polygon
              className="d"
              points="294.46 314.54 310.96 279.95 350.71 298.04 294.46 314.54"
            />
            <polygon
              className="e"
              points="149.57 421.67 159.11 340.97 96.9 342.76 149.57 421.67"
            />
            <polygon
              className="e"
              points="348.72 340.97 358.26 421.67 410.93 342.76 348.72 340.97"
            />
            <polygon
              className="e"
              points="396.03 252.13 284.32 257.1 294.66 314.54 311.16 279.95 350.91 298.04 396.03 252.13"
            />
            <polygon
              className="e"
              points="157.12 298.04 196.87 279.95 213.17 314.54 223.7 257.1 111.8 252.13 157.12 298.04"
            />
            <polygon
              className="f"
              points="111.8 252.13 158.71 343.55 157.12 298.04 111.8 252.13"
            />
            <polygon
              className="f"
              points="350.91 298.04 348.92 343.55 396.03 252.13 350.91 298.04"
            />
            <polygon
              className="f"
              points="223.7 257.1 213.17 314.54 226.29 382.31 229.27 293.07 223.7 257.1"
            />
            <polygon
              className="f"
              points="284.32 257.1 278.96 292.87 281.34 382.31 294.66 314.54 284.32 257.1"
            />
            <polygon
              className="g"
              points="294.66 314.54 281.34 382.31 290.88 388.87 348.92 343.55 350.91 298.04 294.66 314.54"
            />
            <polygon
              className="g"
              points="157.12 298.04 158.71 343.55 216.75 388.87 226.29 382.31 213.17 314.54 157.12 298.04"
            />
            <polygon
              className="h"
              points="295.65 451.28 296.25 432.8 291.28 428.42 216.35 428.42 211.78 432.8 212.18 451.28 149.57 421.67 171.43 439.55 215.75 470.36 291.88 470.36 336.4 439.55 358.26 421.67 295.65 451.28"
            />
            <polygon
              className="i"
              points="290.88 388.87 281.34 382.31 226.29 382.31 216.75 388.87 211.78 432.8 216.35 428.42 291.28 428.42 296.25 432.8 290.88 388.87"
            />
            <polygon
              className="j"
              points="490.44 156.92 507.33 75.83 482.09 0.5 290.88 142.41 364.42 204.62 468.37 235.03 491.43 208.2 481.49 201.05 497.39 186.54 485.07 177 500.97 164.87 490.44 156.92"
            />
            <polygon
              className="j"
              points="0.5 75.83 17.39 156.92 6.66 164.87 22.56 177 10.44 186.54 26.34 201.05 16.4 208.2 39.26 235.03 143.21 204.62 216.75 142.41 25.54 0.5 0.5 75.83"
            />
            <polygon
              className="g"
              points="468.37 235.03 364.42 204.62 396.03 252.13 348.92 343.55 410.93 342.76 503.36 342.76 468.37 235.03"
            />
            <polygon
              className="g"
              points="143.21 204.62 39.26 235.03 4.67 342.76 96.9 342.76 158.71 343.55 111.8 252.13 143.21 204.62"
            />
            <polygon
              className="g"
              points="284.32 257.1 290.88 142.41 321.1 60.72 186.93 60.72 216.75 142.41 223.7 257.1 226.09 293.27 226.29 382.31 281.34 382.31 281.74 293.27 284.32 257.1"
            />
          </svg>
          <h1 className="header-text">MetaMask</h1>
        </div>
        <div className="address-container">
          Destination Address:
          <div className="address">{destinationAddress}</div>
          <a
            href={destinationAddressUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Address
          </a>
        </div>
        <label id="network-label" htmlFor="network">
          Network:
        </label>
        <Select
          options={options}
          aria-labelledby="network-label"
          defaultValue={options[0]}
          onChange={changeNetwork}
          formatOptionLabel={(option) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={option.icon}
                alt={option.label}
                style={{ width: 20, height: 20, marginRight: 8 }}
              />
              {option.label}
            </div>
          )}
          styles={customStyles}
        />
        <label htmlFor="crypto-amount">Payment Amount ({currency}):</label>
        <input
          className="form-control"
          type="number"
          name="amount"
          value={amount ? amount.toFixed(MAXIMUM_DECIMAL_PLACES) : "0.00"}
          onChange={updateCryptoDonateAmount}
          id="crypto-amount"
        />
        <button className="btn-primary" onClick={startPayment}>
          Confirm Payment
        </button>
        {transactionUrl && (
          <Alert
            type="success"
            className="alert"
            message={
              <p>
                Payment Complete:{" "}
                <a
                  href={transactionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Transaction
                </a>
              </p>
            }
          />
        )}
        {error && <Alert type="error" message={error} />}
      </div>
    </div>
  );
}

export default CryptoPaymentForm;
