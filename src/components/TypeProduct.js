import React from "react";

const Typeproduct = (props) => {
  const { item } = props;
  if (item == 1) {
    return <span>Sách văn học</span>;
  } else if (item == 2) {
    return <span>Sách kĩ năng sống</span>;
  } else if (item == 3) {
    return <span>Sách lịch sử</span>;
  } else if (item == 4) {
    return <span>Sách tâm lý</span>;
  } else if (item == 5) {
    return <span>Sách giáo khoa</span>;
  } else if (item == 6) {
    return <span>Truyện tranh</span>;
  }
};

export default Typeproduct;
