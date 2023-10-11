import moment from "moment";
import React from "react";

const ConvertToString = (props) => {
  const { item } = props;

  const newItem = item
    ?.toString()
    ?.replace(/[^a-zA-Z0-9 ]/g, "-")
    ?.slice(0, 10);

  return <div>{newItem}</div>;
};

export default ConvertToString;
