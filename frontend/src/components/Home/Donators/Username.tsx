import React from "react";

import { UsernameProps } from "../../../lib/types";

import "../../../styles/home/donators/username.css";

function Username({ username }: UsernameProps) {
  return <div className="username">{username}</div>;
}

export default Username;
