import React from "react";

const TranslationList = (props) => {
  return (
    <div>
      {props.children.map((el, i) => (
        <h1 key={i}>{el}</h1>
      ))}
    </div>
  );
};

export default TranslationList;
