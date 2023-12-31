import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { customAxios } from "../config/api";
import { useEffect, useState } from "react";
import { currencyFormat } from "../ultils/constant";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addListproduct } from "../redux/productSlice";
import { addListuser } from "../redux/roomSlice";
const Widget = ({ type, amount }) => {
  let data;
  const [productState, setproductState] = useState(null);
  const [userState, setuserState] = useState(null);
  const [orderState, setorderState] = useState(null);
  const [bookingRoomLength, setbookingRoomLength] = useState(null);
  const [revenueState, setrevenueState] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getproductApi();
  }, []);
  const getproductApi = async () => {
    try {
      const res = await customAxios.get("/Book/GetProductList/read.php");
      dispatch(addListproduct(res?.data));
      setproductState(res?.data?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };

  useEffect(() => {
    getuserApi();
  }, []);
  const getuserApi = async () => {
    try {
      const response = await customAxios.get("/Book/GetUserList/ListUser.php", {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      dispatch(addListuser(response?.data));
      setuserState(response?.data?.data);
      console.log(userState);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getorderApi();
  }, []);
  const getorderApi = async () => {
    try {
      const response = await customAxios.get("/Book/GetBill/getAllBill.php");
      setorderState(response?.data?.result);
      console.log("orderState", orderState);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   getrevenueApi();
  // }, []);
  // const getrevenueApi = async () => {
  //   try {
  //     const res = await customAxios.get("/booking/month");
  //     setrevenueState(res?.data);
  //   } catch (error) {
  //     console.log("Lỗi", error);
  //   }
  // };
  // console.log("doanhthu", revenueState);
  // const doanhthu = revenueState?.map((item) => {
  //   return item?.money;
  // });
  // const calculateSum = () => {
  //   let sum = 0;
  //   doanhthu?.forEach((number) => {
  //     sum += number;
  //   });
  //   return sum;
  // };

  // const sumdoanhthu = currencyFormat(calculateSum(doanhthu));
  // console.log("sumdoanhthu", sumdoanhthu);

  // const amountRevenues = revenueState?.data.reduce((accumulator, object) => {
  //   return accumulator + object.totalRevenue;
  // }, 0);
  // console.log("reve..", amountRevenues);
  // const sumRevenues = currencyFormat(amountRevenues);

  const sumdoanhthu = currencyFormat("4850000");

  switch (type) {
    case "product":
      data = {
        amount: productState?.length,
        title: "SẢN PHẨM",
        isMoney: false,
        // link: "See all rooms",
        icon: (
          <Inventory2OutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data = {
        amount: orderState?.length,
        title: "ĐƠN ĐẶT",
        isMoney: false,
        // link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        amount: sumdoanhthu,
        title: "DOANH THU",
        // isMoney: true,
        // link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data = {
        amount: userState?.length,
        title: "NGƯỜI DÙNG",
        // isMoney: true,
        // link: "See details",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>

        <span className="counter">{data.amount}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          {/* <KeyboardArrowUpIcon /> */}
          {/* {diff} % */}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
