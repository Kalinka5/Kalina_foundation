import React, { useEffect, useState } from "react";
import "../css/donaters.css";
import api from "../api";
import { Fa1, Fa2, Fa3, Fa4, Fa5 } from "react-icons/fa6";

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
      <div className="donaters-card">
        <h1>Top donaters</h1>
        <div className="pedestal">
          {donaters.map((user, index) => (
            <div className={`bar${index + 1}`} key={user.id}>
              <div className="donater-image">
                <img
                  className={`image${index + 1}`}
                  src={process.env.REACT_APP_API_URL + user.image}
                  alt="Donater"
                />
              </div>
              <div className="donated">Задонатив/ла {user.donated} грн.</div>
              <div className={`user${index + 1}`}>{user.username}</div>
              <i className={`icon__${index + 1}`}>{places[index]}</i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Donaters;
