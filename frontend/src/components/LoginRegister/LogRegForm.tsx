import React from "react";

import { LogRegFormProps } from "../../lib/types.tsx";

import "../../styles/loginRegister/logRegForm.css";

function LogRegForm({ handleSubmit, children }: LogRegFormProps) {
  return (
    <form className="log-reg-form" onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

export default LogRegForm;
