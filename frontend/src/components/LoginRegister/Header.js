import React from "react";

function LogRegHeader({ text, translate = { t: (key) => key } }) {
  const { t } = translate;
  return <h2>{t(text)}</h2>;
}

export default LogRegHeader;
