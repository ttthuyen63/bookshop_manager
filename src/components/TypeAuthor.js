import React from "react";
const TypeAuthor = (props) => {
  const { item } = props;
  if (item == 1) {
    return <span>Dostoevsky</span>;
  } else if (item == 2) {
    return <span>Đoàn Giỏi</span>;
  } else if (item == 3) {
    return <span>Nguyễn Bảo Trung</span>;
  } else if (item == 4) {
    return <span>Fujiko F Fujio</span>;
  } else if (item == 5) {
    return <span>Brian Tracy</span>;
  } else if (item == 6) {
    return <span>Nguyễn Nhật Ánh</span>;
  }
};
export default TypeAuthor;
