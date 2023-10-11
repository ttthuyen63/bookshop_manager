import React, { useState, useEffect } from "react";
import { Button, Container, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import userIcon from "../image/usericon.png";
import { Link, useNavigate } from "react-router-dom";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  ModalTitle,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { customAxios } from "../config/api";
import HomePage from "./homePage";
import { logout } from "../redux/userSlice";
import { useMemo } from "react";
import moment from "moment";
import { currencyFormat } from "../ultils/constant";
import SideBar from "../components/Sidebar";
import sidebar_menu from "../constants/sidebar-menu";
import Select from "react-select";
import { Uploader } from "uploader";
import { useRef } from "react";
import FileResizer from "react-image-file-resizer";
import { addListuser } from "../redux/roomSlice";

export default function UserListPage() {
  const [userState, setuserState] = useState(null);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState(userState);
  const [deleteId, setdeleteId] = useState("");
  const [deleteCode, setdeleteCode] = useState("");
  const [filteruser, setfilteruser] = useState();
  const [showDel, setshowDel] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [detail, setDetail] = useState([]);
  const [showDetail, setShowDetail] = useState(false);
  const [modal, setmodal] = useState(false);
  const [hotelState, sethotelState] = useState(null);
  const [hotelNameState, sethotelNameState] = useState(null);
  const [hotelNameData, sethotelNameData] = useState(null);
  const [phanloai, setphanloai] = useState();
  const [phanloaiData, setphanloaiData] = useState();

  console.log("userState...", userState);
  const userList = useSelector((state) => state.userReducer);

  const queryParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();

  const convertToObj = (item) => {
    return {
      value: item,
      label: item,
    };
  };

  useEffect(() => {
    getuserApi();
  }, []);
  const getuserApi = async () => {
    try {
      const response = await customAxios.get(
        "/Product/GetUserList/ListUser.php",
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      dispatch(addListuser(response?.data));
      setuserState(response?.data?.data);
      console.log(userState);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
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
    // console.log("id: ", deleteId);
    try {
      await customAxios.delete(`/user?id=${deleteCode}`);
      getuserApi();
    } catch (error) {
      console.log("Lỗi", error);
    }
    setshowDel(false);
  };

  const goToDetail = (code) => {
    navigate("/userDetail/" + code);
  };

  const handleChangeSearch = (e) => {
    const query = e.target.value;
    var searchList = [...userState];
    // var searchList = [...filterData(userState)];
    searchList = searchList?.filter((item) => {
      return item?.TENKH?.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setSearch(searchList);
    setShow(true);
  };
  function getFilterList() {
    if (!filteruser) {
      return userState;
      // return filterData(userState);
    }
    return userState?.filter(
      // return filterData(userState)?.filter(
      (item) => item?.TENKH === filteruser
    );
  }

  var filterList = useMemo(getFilterList, [filteruser, userState]);
  // var filterList = useMemo(getFilterList, [filteruser, filterData(userState)]);
  function handleChange(event) {
    setfilteruser(event.target.value);
  }

  const navigate = useNavigate();

  const uploader = new Uploader({
    // Get production API keys from Upload.io
    apiKey: "free",
  });

  const spanStyle = {
    padding: "20px",
    background: "#efefef",
    color: "#000000",
  };

  const divStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "cover",
    height: "400px",
  };

  const handleChangeHotelName = (e) => {
    sethotelNameData(e);
  };

  const handleChangePhanLoai = (e) => {
    setphanloaiData(e);
  };

  const [randomNumber, setRandomNumber] = useState(null);
  const [generatedNumbers, setGeneratedNumbers] = useState([]);

  const generateRandomNumber = () => {
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * 100) + 1; // Sinh số ngẫu nhiên từ 1 đến 100
    } while (generatedNumbers.includes(newNumber)); // Kiểm tra tính duy nhất của số mới

    setRandomNumber(newNumber);
    setGeneratedNumbers([...generatedNumbers, newNumber]);
  };

  const handleAdd = () => {
    setmodal(true);
    generateRandomNumber();
  };

  return (
    <div>
      {show === false ? (
        <div>
          {/* {userState?.map((item, index) => (
            <Modal isOpen={showDel} onHide={handleClose}>
              <ModalHeader closeButton>
                <div>Bạn có chắc là sẽ xóa?</div>
              </ModalHeader>
              <ModalBody>
                Hành động này sẽ xóa dữ liệu vĩnh viễn, bạn hãy chắc chắn là sẽ
                muốn xóa.
              </ModalBody>
              <ModalFooter>
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
              </ModalFooter>
            </Modal>
          ))} */}
        </div>
      ) : (
        <div>
          {search?.map((item, index) => (
            <Modal isOpen={showDel} onHide={handleClose}>
              <ModalHeader closeButton>
                {/* <div>Bạn có chắc là sẽ xóa?</div> */}
              </ModalHeader>
              <ModalBody>
                Hành động này sẽ xóa dữ liệu vĩnh viễn, bạn hãy chắc chắn là sẽ
                muốn xóa.
              </ModalBody>
              <ModalFooter>
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
              </ModalFooter>
            </Modal>
          ))}
        </div>
      )}

      <div className="row">
        <div className="col-sm-2" style={{ padding: 0 }}>
          <SideBar menu={sidebar_menu} />
        </div>

        <div className="col-sm-10" style={{ padding: 0 }}>
          <div className="content">
            <div className="content-header">
              <h5 className="content-account">
                <Button
                  onClick={() => {
                    dispatch(logout());
                    navigate("/");
                  }}
                >
                  Đăng xuất
                </Button>
              </h5>
            </div>

            {/* <div className="begin-item">
              <button
                className="btn-new"
                type="button"
                onClick={() => handleAdd()}
              >
                THÊM PHÒNG
              </button>
              <form className="form-inline w-50">
                <select
                  className="browser-default custom-select mb-2 mr-3"
                  onChange={handleChange}
                >
                  <option selected disabled>
                    Lọc theo Khách sạn
                  </option>
                  <option value="">Tất cả</option>
                  {uniqueArr?.map((item) => (
                    <option value={item}>{item}</option>
                  ))}

                </select>
              </form>
            </div> */}
            <div className="control-hotel">
              <div className="mt-3 control-hotel-table shadow-sm p-3 mb-5 bg-white rounded">
                <div className="item-header">
                  <h2>Danh sách người dùng</h2>
                  <div className="item-search">
                    <input
                      type="text"
                      className="item-search-input"
                      placeholder="Tìm kiếm ..."
                      onChange={handleChangeSearch}
                    />
                  </div>
                </div>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <table className="table recently-violated">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Mã khách hàng</th>
                        <th scope="col">Tên khách hàng</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Xóa</th>
                      </tr>
                    </thead>
                    {/* ----------------------------------------- */}
                    {show === false ? (
                      <tbody id="myTable">
                        {filterList?.map((item, index) => (
                          <tr>
                            <td>
                              <img
                                src={userIcon}
                                style={{ height: "50px", width: "50px" }}
                              />
                            </td>
                            <td>{item?.MAKH}</td>
                            <td>{item?.TENKH}</td>
                            <td>{item?.DIENTHOAI}</td>
                            <td>{item?.DIACHI}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger btn-xs"
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
                                  <FontAwesomeIcon icon={faTrash} /> Xóa
                                </span>
                              </button>
                            </td>
                          </tr>
                        ))}
                        <div></div>
                      </tbody>
                    ) : (
                      ""
                    )}
                    {show === true ? (
                      <tbody id="myTable">
                        {search?.map((item, index) => (
                          <tr>
                            <td>
                              <img
                                src={userIcon}
                                style={{ height: "50px", width: "50px" }}
                              />
                            </td>
                            <td>{item?.MAKH}</td>
                            <td>{item?.TENKH}</td>
                            <td>{item?.DIENTHOAI}</td>
                            <td>{item?.DIACHI}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger btn-xs"
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
                                  <FontAwesomeIcon icon={faTrash} /> Xóa
                                </span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      ""
                    )}
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
