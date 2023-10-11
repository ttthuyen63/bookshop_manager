//API_KEY lưu riêng để nếu đổi project thì firebase vẫn chạy đc
export const API_KEY = "AIzaSyDVZ9qIC_S9hlL7qSZREk4VZ6Mfu1Ko344";

export const currencyFormat = (num) => {
  if (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + "đ";
  }
  return "";
};
