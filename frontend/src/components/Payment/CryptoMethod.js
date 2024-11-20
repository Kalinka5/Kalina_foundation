import React, { useState } from "react";

import Select from "react-select";

import { Alert } from "antd";

import { ethers, parseEther } from "ethers";

import bnbLogo from "../../img/bnb.svg";
import ethLogo from "../../img/eth_logo.svg";
import metaMaskIcon from "../../img/metamask-icon.svg";

import api from "../../lib/api";

import "../../styles/payment/cryptoMethod.css";

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
    } else {
      email = "Unknown Email";
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
    <div className="metamask">
      <div className="header">
        <img className="header-icon" src={metaMaskIcon} alt="MetaMask" />
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
          <div
            className="network-select__option"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              src={option.icon}
              alt={option.label}
              className="network-select__img"
            />
            {option.label}
          </div>
        )}
        styles={customStyles}
        className="network-select"
        classNamePrefix="network-select"
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
  );
}

export default CryptoPaymentForm;
