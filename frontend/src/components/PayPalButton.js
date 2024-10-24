import React, { useState } from "react";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import api from "../api";

const DonationButton = () => {
  const [donationAmount, setDonationAmount] = useState(20);

  const handlePaymentSuccess = async (details, data) => {
    if (!data || !details) {
      console.error("Invalid transaction data");
      return;
    }
    console.log(donationAmount);
    // Send the transaction data to the backend
    await api
      .post("donate/", {
        amount: donationAmount,
        transaction_id: data.orderID || "Unknown Transaction ID", // Fallback to a default
        email: details.payer ? details.payer.email_address : "Unknown Email", // Handle undefined payer
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating donation", error);
      });
  };

  return (
    <PayPalScriptProvider
      options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
    >
      <input
        type="number"
        value={donationAmount}
        onChange={(e) => setDonationAmount(e.target.value)}
        placeholder="Enter donation amount"
      />
      <PayPalButtons
        forceReRender={[donationAmount]}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: donationAmount.toString(),
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          try {
            const details = await actions.order.capture();
            await handlePaymentSuccess(details, data);
          } catch (error) {
            console.error("Error capturing order", error);
          }
        }}
      />
    </PayPalScriptProvider>
  );
};

export default DonationButton;
