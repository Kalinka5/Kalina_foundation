import React, { useEffect, useState } from "react";

import { Fa1, Fa2, Fa3, Fa4, Fa5 } from "react-icons/fa6";
import { IoIosCash } from "react-icons/io";

import api from "../api";

import "../styles/donaters.css";

function Donaters() {
  const [donaters, setDonaters] = useState([]);
  const places = {
    0: <Fa1 />,
    1: <Fa2 />,
    2: <Fa3 />,
    3: <Fa4 />,
    4: <Fa5 />,
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await api.get("/donaters");
      console.log(res.data);
      setDonaters(res.data);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="donaters">
      <div className="donators-title">
        <div className="icon-row">
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
        </div>
        <div className="icon-row">
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
        </div>
        <div className="icon-row">
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
        </div>
        <div className="icon-row">
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
        </div>
        <div className="icon-row">
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
        </div>
        <div className="icon-row">
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
        </div>
        <div className="icon-row">
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
        </div>
        <div className="icon-row">
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
        </div>
        <div className="icon-row">
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
        </div>
        <div className="icon-row">
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
        </div>
        <div className="icon-row">
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
        </div>
        <div className="icon-row">
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
          <div>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
            <i className="title-icons">
              <IoIosCash />
            </i>
          </div>
        </div>

        <p className="container-title">Топ Донатерів</p>
      </div>
      <div className="donaters-card">
        <div className="pedestal">
          {donaters.map((user, index) => (
            <div className={`bar${index + 1}`} key={user.id}>
              <div className="profile-pic">
                <img
                  className="profile-pic-image"
                  src={process.env.REACT_APP_API_URL + user.image}
                  alt="Donater"
                />
              </div>
              <div className="donated">Задонатив/ла {user.donated} грн.</div>
              <div className="underline"></div>
              <div className={`user${index + 1}`}>{user.username}</div>
              <div className="icon-background">
                <i className={`icon color${index + 1}`}>{places[index]}</i>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Donaters;
