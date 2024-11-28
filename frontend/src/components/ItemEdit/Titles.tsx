import React from "react";

import { TitleProps } from "../../lib/types";

import "../../styles/itemEdit/titles.css";

export function H1({ children }: TitleProps) {
  return <h1>{children}</h1>;
}

export function H4({ children }: TitleProps) {
  return <h4>{children}</h4>;
}
