import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customAxios } from "../config/api";
import { logout } from "../redux/userSlice";
import { useMemo } from "react";
import { currencyFormat } from "../ultils/constant";
import SideBar from "../components/Sidebar";
import sidebar_menu from "../constants/sidebar-menu";
import StatusBill from "../components/StatusBill";
import {
  Col,
  Button,
  Tooltip,
  Modal,
  Row,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Typeproduct from "../components/TypeProduct";
import TypeAuthor from "../components/TypeAuthor";
export default function OrderPage() {
  const [orderState, setorderState] = useState(null);
  const [orderDetail, setorderDetail] = useState(null);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(orderState);
  const [deleteCode, setdeleteCode] = useState("");
  const [filterorder, setfilterorder] = useState();
  const [showDel, setshowDel] = useState(false);
  const [isActiveOrder, setisActiveOrder] = useState(false);
  const [modelDetail, setmodelDetail] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);

  const orderList = useSelector((state) => state.orderReducer);

  const queryParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
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
  const handleDetail = async (id) => {
    try {
      setIsLoadingDetail(true);
      const response = await customAxios.get(
        `/Book/GetBill/getBillByMahd.php?mahd=${id}`
      );
      setorderDetail(response?.data?.result);
      setmodelDetail(true);
      setIsLoadingDetail(false);
      console.log("orderDetail[0]", orderDetail[0]);
    } catch (error) {
      console.error(error);
      setIsLoadingDetail(false);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    if (orderDetail && !isLoadingDetail) {
      // Do something with editProductData here
      // Khai báo các xử lý cần thực hiện sau khi cập nhật editProductData ở đây
    }
  }, [orderDetail, isLoadingDetail]);

  const handleConfirmBill = async (id) => {
    try {
      const formData = new FormData();
      formData.append("MAHD", `${id}`);
      formData.append("STATUS", "2");

      const response = await customAxios.post(
        "/Book/GetBill/updateStatusBill.php",
        formData
      );
      window.location.reload();
      setorderDetail();
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };
  const handleRefuseBill = async (id) => {
    try {
      const formData = new FormData();
      formData.append("MAHD", `${id}`);
      formData.append("STATUS", "4");

      const response = await customAxios.post(
        "/Book/GetBill/updateStatusBill.php",
        formData
      );
      window.location.reload();
      setorderDetail();
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setshowDel(false);
  };

  const handleClickDelete = (id) => {
    setdeleteCode(id);
    setshowDel(true);
  };

  const handleDelete = async () => {
    try {
      await customAxios.delete(`/booking?id=${deleteCode}`);
      getorderApi();
    } catch (error) {
      console.log("Lỗi", error);
    }
    setshowDel(false);
  };

  const handleChangeSearch = (e) => {
    const query = e.target.value;
    var searchList = [...orderState];

    searchList = searchList?.filter((item) => {
      return item?.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setSearch(searchList);
    setShow(true);
  };
  function getFilterList() {
    if (!filterorder) {
      return orderState;
    }
    return orderState?.filter((item) => item?.name === filterorder);
  }

  var filterList = useMemo(getFilterList, [filterorder, orderState]);
  function handleChange(event) {
    setfilterorder(event.target.value);
  }

  const navigate = useNavigate();

  const [sortedOrders, setSortedOrders] = useState([]);
  const [sortedData, setsortedData] = useState();

  const handleSort = () => {
    const sortedData = orderState;
    const sorted = [...sortedData].sort((a, b) => b.id - a.id);
    setSortedOrders(sorted);
    setShow((prevShow) => !prevShow);
  };

  return (
    <div>
      {show === false ? (
        <div>
          {orderState?.map((item, index) => (
            <Modal show={showDel} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Bạn có chắc là sẽ xóa?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Hành động này sẽ xóa dữ liệu vĩnh viễn, bạn hãy chắc chắn là sẽ
                muốn xóa.
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="danger"
                  // onClick={() => handleDelete(item?.id)
                  onClick={handleDelete}
                  // }
                >
                  Xóa
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Hủy
                </Button>
              </Modal.Footer>
            </Modal>
          ))}
        </div>
      ) : (
        <div>
          {search?.map((item, index) => (
            <Modal show={showDel} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Bạn có chắc là sẽ xóa?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Hành động này sẽ xóa dữ liệu vĩnh viễn, bạn hãy chắc chắn là sẽ
                muốn xóa.
              </Modal.Body>
              <Modal.Footer>
                {/* <Button variant="danger" onClick={() => handleDelete(item?.id)}> */}
                <Button
                  variant="danger"
                  // onClick={() => handleDelete(item?.id)
                  onClick={handleDelete}
                  // }
                >
                  Xóa
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Hủy
                </Button>
              </Modal.Footer>
            </Modal>
          ))}
        </div>
      )}
      <div>
        <Modal
          size="lg"
          isOpen={modelDetail}
          toggle={() => setmodelDetail(!modelDetail)}
        >
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <ModalHeader toggle={() => setmodelDetail(!modelDetail)}>
                Chi tiết đơn hàng ĐH{orderDetail[0]?.MAHD}
              </ModalHeader>
              <ModalBody>
                <form>
                  <Row>
                    <Col lg={6}>
                      <Row className="form-group">
                        Mã khách hàng: {orderDetail[0]?.MAKH}
                      </Row>
                      <Row className="form-group">
                        Tên khách hàng: {orderDetail[0]?.TENKH}
                      </Row>
                      <Row className="form-group">
                        Địa chỉ: {orderDetail[0]?.DIACHI}
                      </Row>
                      <Row className="form-group">
                        Số điện thoại: {orderDetail[0]?.PHONE}
                      </Row>
                    </Col>
                    <Col lg={6}>
                      <Row className="form-group">
                        Ngày mua hàng: {orderDetail[0]?.NGAYLAP_HD}
                      </Row>
                      <Row className="form-group">
                        Ghi chú: {orderDetail[0]?.NOTE}
                      </Row>
                      <Row className="form-group">
                        Tổng tiền: {currencyFormat(orderDetail[0]?.TONGTIEN)}
                      </Row>
                    </Col>
                    <Col lg={12}>
                      <table
                        className="table recently-violated"
                        style={{ marginTop: "10px" }}
                      >
                        <thead>
                          <tr>
                            <th scope="col">Hình ảnh</th>
                            <th scope="col">Mã sản phẩm</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Tác giả</th>
                            <th scope="col">Phân loại</th>
                            <th scope="col">Giá</th>
                            {/* <th scope="col">Xem thêm</th> */}
                            <th scope="col">Số lượng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderDetail[0]?.ListProduct?.map((item, index) => (
                            <tr>
                              <td>
                                <img
                                  src={item?.IMAGE}
                                  style={{ height: "50px", width: "50px" }}
                                />
                              </td>
                              <td>{item?.MASP}</td>
                              <td>{item?.TENSP}</td>
                              <td>{item?.TENTG}</td>
                              <td>
                                <Typeproduct item={item?.LOAISP} />
                              </td>

                              <td>{currencyFormat(item?.GIABAN)}</td>
                              <td>{item?.SOLUONG}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </Col>
                  </Row>
                </form>
              </ModalBody>
            </>
          )}
        </Modal>
      </div>

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

            <div className="begin-item">
              <div className="begin-item">
                <button className="btn-new" type="button" onClick={handleSort}>
                  Mới nhất
                </button>
              </div>
            </div>
            <div className="control-order">
              <div
                className="mt-3 control-order-table shadow-sm p-3 mb-5 bg-white rounded"
                style={{ margin: "0px 10px" }}
              >
                <div className="item-header">
                  <h2>Danh sách đơn đặt</h2>
                  <div className="item-search">
                    <input
                      type="text"
                      className="item-search-input"
                      placeholder="Tìm kiếm ..."
                      onChange={handleChangeSearch}
                    />
                  </div>
                </div>
                <table className="table recently-violated">
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
                      <th scope="col">Duyệt đơn</th>
                      <th scope="col">Hủy đơn</th>
                    </tr>
                  </thead>
                  {/* ----------------------------------------- */}
                  {show === false ? (
                    <tbody id="myTable">
                      {orderState?.map((item, index) => (
                        <tr>
                          <td onClick={() => handleDetail(item?.MAHD)}>
                            HĐ{item?.MAHD}
                          </td>
                          <td>{item?.MAKH}</td>
                          <td>{item?.TENKH}</td>
                          <td>{item?.NGAYLAP_HD}</td>
                          <td>{item?.PHONE}</td>
                          <td>{currencyFormat(item?.TONGTIEN)}</td>
                          {/* <td>{item?.start_date}</td> */}
                          {/* <td>{item?.STATUS}</td> */}
                          <td>
                            <StatusBill item={item?.STATUS} />
                          </td>
                          <td>
                            {item?.STATUS == "0" || item?.STATUS == 2 ? (
                              <button
                                type="button"
                                className="btn btn-secondary btn-xs"
                                data-toggle="modal"
                                onClick={() => handleConfirmBill(item?.MAHD)}
                              >
                                <span
                                  className={{
                                    dataToggle: Tooltip,
                                    title: "Duyệt",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faCheck} /> Duyệt
                                </span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-secondary btn-xs"
                                data-toggle="modal"
                                disabled
                                // data-target="#delModal"
                                onClick={() => handleConfirmBill(item?.MAHD)}
                              >
                                <span
                                  className={{
                                    dataToggle: Tooltip,
                                    title: "Duyệt",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faCheck} /> Duyệt
                                </span>
                              </button>
                            )}
                          </td>
                          <td>
                            {item?.STATUS == 2 ? (
                              <button
                                type="button"
                                className="btn btn-secondary btn-xs"
                                // data-toggle="modal"
                                disabled
                                // data-target="#delModal"
                                onClick={() => handleRefuseBill(item?.MAHD)}
                              >
                                <span
                                  className={{
                                    dataToggle: Tooltip,
                                    title: "Xóa",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faTrash} /> Hủy
                                </span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-secondary btn-xs"
                                // data-toggle="modal"
                                disabled
                                // data-target="#delModal"
                                onClick={() => handleRefuseBill(item?.MAHD)}
                              >
                                <span
                                  className={{
                                    dataToggle: Tooltip,
                                    title: "Xóa",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faTrash} /> Hủy
                                </span>
                              </button>
                            )}
                          </td>

                          {/* <td>
                            <button
                              type="button"
                              className="btn btn-xs"
                              data-toggle="modal"
                              data-target="#delModal"
                              onClick={() => handleClickDelete(item?.id)}
                            >
                              <span
                                className={{
                                  dataToggle: Tooltip,
                                  title: "Xóa",
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} /> Hủy
                              </span>
                            </button>
                          </td> */}
                        </tr>
                      ))}
                      <div></div>
                    </tbody>
                  ) : (
                    ""
                  )}
                  {show === true ? (
                    <tbody id="myTable">
                      {sortedOrders?.map((item, index) => (
                        <tr>
                          <td onClick={() => handleDetail(item?.MAHD)}>
                            HĐ{item?.MAHD}
                          </td>
                          <td>{item?.MAKH}</td>
                          <td>{item?.TENKH}</td>
                          <td>{item?.NGAYLAP_HD}</td>
                          <td>{item?.PHONE}</td>
                          <td>{currencyFormat(item?.TONGTIEN)}</td>
                          {/* <td>{item?.start_date}</td> */}
                          {/* <td>{item?.STATUS}</td> */}
                          <td>
                            <StatusBill item={item?.STATUS} />
                          </td>
                          <td>
                            {item?.STATUS == "0" || item?.STATUS == 2 ? (
                              <button
                                type="button"
                                className="btn btn-secondary btn-xs"
                                data-toggle="modal"
                                onClick={() => handleConfirmBill(item?.MAHD)}
                              >
                                <span
                                  className={{
                                    dataToggle: Tooltip,
                                    title: "Duyệt",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faCheck} /> Duyệt
                                </span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-secondary btn-xs"
                                data-toggle="modal"
                                disabled
                                // data-target="#delModal"
                                onClick={() => handleConfirmBill(item?.MAHD)}
                              >
                                <span
                                  className={{
                                    dataToggle: Tooltip,
                                    title: "Duyệt",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faCheck} /> Duyệt
                                </span>
                              </button>
                            )}
                          </td>
                          <td>
                            {item?.STATUS == 2 ? (
                              <button
                                type="button"
                                className="btn btn-secondary btn-xs"
                                // data-toggle="modal"
                                disabled
                                // data-target="#delModal"
                                onClick={() => handleRefuseBill(item?.MAHD)}
                              >
                                <span
                                  className={{
                                    dataToggle: Tooltip,
                                    title: "Xóa",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faTrash} /> Hủy
                                </span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="btn btn-secondary btn-xs"
                                // data-toggle="modal"
                                disabled
                                // data-target="#delModal"
                                onClick={() => handleRefuseBill(item?.MAHD)}
                              >
                                <span
                                  className={{
                                    dataToggle: Tooltip,
                                    title: "Xóa",
                                  }}
                                >
                                  <FontAwesomeIcon icon={faTrash} /> Hủy
                                </span>
                              </button>
                            )}
                          </td>

                          {/* <td>
                            <button
                              type="button"
                              className="btn btn-xs"
                              data-toggle="modal"
                              data-target="#delModal"
                              onClick={() => handleClickDelete(item?.id)}
                            >
                              <span
                                className={{
                                  dataToggle: Tooltip,
                                  title: "Xóa",
                                }}
                              >
                                <FontAwesomeIcon icon={faTrash} /> Hủy
                              </span>
                            </button>
                          </td> */}
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    ""
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
