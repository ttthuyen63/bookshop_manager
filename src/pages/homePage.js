import React from "react";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { customAxios } from "../config/api";
import { useState } from "react";
import { logout } from "../redux/userSlice";
import Widget from "../components/Widget";
// import Chart from "../components/Chart";
import SideBar from "../components/Sidebar";
import sidebar_menu from "../constants/sidebar-menu";
import Chart from "react-apexcharts";
import { currencyFormat } from "../ultils/constant";
import StatusBill from "../components/StatusBill";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function HomePage() {
  // const [first, setfirst] = useState(second);
  const [moneyState, setmoneyState] = useState(null);
  const [productStateLength, setproductStateLength] = useState(null);
  const [borrowStateLength, setborrowStateLength] = useState(null);
  const [isActiveProduct, setisActiveProduct] = useState(false);
  const [isActiveOrder, setisActiveOrder] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderState, setorderState] = useState(null);

  useEffect(() => {
    getorderApi();
  }, []);
  const getorderApi = async () => {
    try {
      const response = await customAxios.get("/Book/GetBill/getAllBill.php");
      setorderState(response?.data?.result);
    } catch (error) {
      console.error(error);
    }
  };

  // const getproductApi = async () => {
  //   try {
  //     const res = await customAxios.get("/lbm/v1/users/get-all");
  //     dispatch(addListproduct(res.data));
  //     setproductStateLength(res?.data);
  //   } catch (error) {
  //     console.log("Lỗi");
  //   }
  // };

  const settings = {
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const latestOrders = orderState?.slice(-5);
  return (
    <div className="row">
      <div className="col-sm-2" style={{ padding: 0 }}>
        <SideBar menu={sidebar_menu} />
      </div>

      <div className="col-sm-10" style={{ padding: 0 }}>
        <div className="content">
          <div className="content-header">
            <h5 className="content-account">
              <Button
                className="btn-login"
                style={{ backgroundColor: "rgb(43, 155, 180)" }}
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}
              >
                Đăng xuất
              </Button>
            </h5>
          </div>

          <div style={{ marginLeft: "200px" }} className="slider-image">
            {/* <img
              // src={require("../assets/images/e2.png")}
              src={require("../Logo-Hoc-Vien-Ky-Thuat-Mat-Ma-ACTVN-1.png")}
              style={{ width: "200px" }}
            /> */}
            <Slider {...settings}>
              <div>
                <img
                  src={require("../image/banner4.jpg")}
                  alt="Image 1"
                  style={{ width: "900px", height: "200px" }}
                />
              </div>
              <div>
                <img
                  src={require("../image/banner2.jpg")}
                  alt="Image 2"
                  style={{ width: "900px", height: "200px" }}
                />
              </div>
              <div>
                <img
                  src={require("../image/banner5.jpg")}
                  alt="Image 3"
                  style={{ width: "900px", height: "200px" }}
                />
              </div>
            </Slider>
          </div>
          <h1 className="" style={{ textAlign: "center" }}>
            Thống kê
          </h1>

          <div className="row statisc">
            <div className="col-1"></div>
            <div
              className="col-10 widgets"
              style={{ justifyContent: "center" }}
            >
              <div className="left">
                <Widget type="product" />
                <Widget type="earning" />
              </div>
              <div className="right">
                <Widget type="balance" />
                <Widget type="order" />
              </div>
            </div>
            <div className="col-1"></div>
          </div>
          <h2 style={{ textAlign: "center" }}>Danh sách các đơn mới nhất</h2>
          <div className="row">
            <div className="col-1"></div>
            <div className="col-10">
              <table className="table recently-violated table-new-order">
                <thead>
                  <tr>
                    <th scope="col">Mã hóa đơn</th>
                    <th scope="col">Mã khách hàng</th>
                    <th scope="col">Tên khách hàng</th>
                    {/* <th scope="col">Số phòng</th> */}
                    <th scope="col">Ngày đặt</th>
                    <th scope="col">SĐT</th>
                    <th scope="col">Tổng giá</th>
                    <th scope="col">Trạng thái</th>
                  </tr>
                </thead>
                {/* ----------------------------------------- */}
                <tbody id="myTable">
                  {latestOrders?.map((item, index) => (
                    <tr>
                      <td
                      // onClick={() => handleDetail(item?.MAKH)}
                      >
                        HĐ{item?.MAHD}
                      </td>
                      <td>{item?.MAKH}</td>
                      <td>{item?.TENKH}</td>
                      <td>{item?.NGAYLAP_HD}</td>
                      <td>{item?.PHONE}</td>
                      <td>{currencyFormat(item?.TONGTIEN)}</td>
                      <td>
                        <StatusBill item={item?.STATUS} />
                      </td>
                    </tr>
                  ))}
                  <div></div>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// chrome.exe --disable-web-security --user-data-dir="C:/ChromeDevSession"
