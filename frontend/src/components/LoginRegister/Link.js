import React from "react";

function LogRegLink(props) {
  const link = props.link;
  const textLink = props.textLink;
  const question = props.question;
  const { t } = props.translate;

  return (
    <p className="help-p">
      {t(question)}
      <br />
      <a href={link}>{t(textLink)}</a>
    </p>
  );
}

export default LogRegLink;
