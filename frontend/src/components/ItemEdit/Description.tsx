import React from "react";

import { DescriptionProps } from "../../lib/types";

import "../../styles/itemEdit/description.css";

function Description({ description, setDescription }: DescriptionProps) {
  return (
    <div className="description">
      <textarea
        id="formMessage"
        className="form-control form-control-lg"
        rows={7}
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
    </div>
  );
}

export default Description;
