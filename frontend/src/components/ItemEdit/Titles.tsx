import React from "react";

import { TitleProps } from "../../lib/types";

import "../../styles/itemEdit/titles.css";

export function H1({ children }: TitleProps) {
  return <h1 className="item-edit-title">{children}</h1>;
}

export function H4({ children }: TitleProps) {
  return <h4 className="item-edit-title">{children}</h4>;
}
