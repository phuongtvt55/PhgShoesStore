import React from "react";
import Header from "../Header";

function Default({ child }) {
  return (
    <div>
      <Header />
      {child}
    </div>
  );
}

export default Default;
