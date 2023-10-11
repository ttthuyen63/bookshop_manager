import React from "react";

const StatusBill = (props) => {
  const { item } = props;
  console.log("item", typeof item);
  if (item == 0) {
    return (
      <div
        style={{
          color: "black",
          backgroundColor: "yellow",
          border: "1px solid #ccc",
          textAlign: "center",
          padding: "5px 0px",
          borderRadius: "10px",
        }}
      >
        {item == "0" ? "Chờ xác nhận" : ""}
      </div>
    );
  } else if (item == 1) {
    return (
      <div
        style={{
          color: "white",
          backgroundColor: "green",
          border: "1px solid #ccc",
          textAlign: "center",
          padding: "5px 0px",
          borderRadius: "10px",
        }}
      >
        {item == 1 ? "Đã xác nhận" : ""}
      </div>
    );
  } else if (item == 2) {
    return (
      <div
        style={{
          color: "white",
          backgroundColor: "#015c92",
          border: "1px solid #ccc",
          textAlign: "center",
          padding: "5px 0px",
          borderRadius: "10px",
        }}
      >
        {item == 2 ? "Đang giao" : ""}
      </div>
    );
  } else if (item == 3) {
    return (
      <div
        style={{
          color: "white",
          backgroundColor: "green",
          border: "1px solid #ccc",
          textAlign: "center",
          padding: "5px 0px",
          borderRadius: "10px",
        }}
      >
        {item == 3 ? "Đã nhận hàng" : ""}
      </div>
    );
  } else if (item == 4) {
    return (
      <div
        style={{
          color: "white",
          backgroundColor: "red",
          border: "1px solid #ccc",
          textAlign: "center",
          padding: "5px 0px",
          borderRadius: "10px",
        }}
      >
        {item == 4 ? "Đã hủy" : ""}
      </div>
    );
  }
};
export default StatusBill;
