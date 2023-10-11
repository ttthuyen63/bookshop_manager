import React from "react";

const Typeproduct = (props) => {
  const { item } = props;
  if (item == 1) {
    return <span>Áo đội tuyển</span>;
  } else if (item == 2) {
    return <span>Áo CLB</span>;
  } else if (item == 3) {
    return <span>Áo thể thao trơn</span>;
  } else if (item == 4) {
    return <span>Giày đá bóng</span>;
  }
};
export default Typeproduct;
