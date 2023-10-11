import React, { useState, useEffect } from "react";
import { Button, Container, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilSquare,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customAxios } from "../config/api";
import { addListproduct } from "../redux/productSlice";
import HomePage from "./homePage";
import { logout } from "../redux/userSlice";
import { useMemo } from "react";
import moment from "moment";
import { currencyFormat } from "../ultils/constant";
import SideBar from "../components/Sidebar";
import sidebar_menu from "../constants/sidebar-menu";
import Select from "react-select";
import TypeProduct from "../components/TypeProduct";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  ModalTitle,
} from "reactstrap";
import { Uploader } from "uploader";
import { UploadButton } from "react-uploader";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { useRef } from "react";
import FileResizer from "react-image-file-resizer";
import axios from "axios";
import Typeproduct from "../components/TypeProduct";

export default function ProductListPage() {
  const [productState, setproductState] = useState(null);
  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [search, setSearch] = useState(productState);
  const [deleteId, setdeleteId] = useState("");
  const [deleteCode, setdeleteCode] = useState("");
  const [filterproduct, setfilterproduct] = useState();
  const [showDel, setshowDel] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modal, setmodal] = useState(false);
  const [modalEdit, setmodalEdit] = useState(false);
  const [editProductData, setEditProductData] = useState(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // State để lưu giá trị đã chọn
  const GIAMGIARef = useRef(null);
  const TENSPRef = useRef(null);
  const KICHCORef = useRef(null);
  const GIABANRef = useRef(null);
  const MOTASPRef = useRef(null);
  const queryParams = new URLSearchParams(window.location.search);
  const dispatch = useDispatch();
  useEffect(() => {
    getproductApi();
  }, []);
  const getproductApi = async () => {
    try {
      const res = await customAxios.get("/Product/GetProductList/read.php");
      dispatch(addListproduct(res?.data));
      setproductState(res?.data?.data);
    } catch (error) {
      console.log("Lỗi", error);
    }
  };
  console.log("product,,,,", productState);

  const options = [
    { value: "1", label: "Áo đội tuyển" },
    { value: "2", label: "Áo CLB" },
    { value: "3", label: "Áo thể thao trơn" },
    { value: "4", label: "Giày đá bóng" },
  ];

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption); // Cập nhật giá trị đã chọn khi người dùng thay đổi
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Tạo đường dẫn từ tệp hình ảnh
      setSelectedImage(imageUrl); // Cập nhật state để hiển thị hình ảnh đã chọn
    }
  };

  const handleEdit = async (item) => {
    try {
      setIsLoadingDetail(true); // Bắt đầu tải dữ liệu
      const detailData = await customAxios.get(
        `/Product/GetProductList/web.php?MASP=${item}`
      );
      setEditProductData(detailData?.data);
      setmodalEdit(true);
      setIsLoadingDetail(false); // Kết thúc tải dữ liệu
    } catch (error) {
      setIsLoadingDetail(false); // Xử lý lỗi và kết thúc tải dữ liệu
      // Xử lý lỗi ở đây nếu cần
    }
  };
  useEffect(() => {
    if (editProductData && !isLoadingDetail) {
      // Do something with editProductData here
      console.log("editProductData updated", editProductData);
      // Khai báo các xử lý cần thực hiện sau khi cập nhật editProductData ở đây
    }
  }, [editProductData, isLoadingDetail]);

  const handleClose = () => {
    setshowDel(false);
    setmodal(false);
  };

  const handleClickDelete = (id) => {
    setdeleteCode(id);
    setshowDel(true);
  };

  const handleDelete = async (item) => {
    try {
      await customAxios.delete(
        `/Product/GetProductList/web.php?MASP=${deleteCode}`
      );
      getproductApi();
    } catch (error) {
      console.log("Lỗi", error);
    }
    setshowDel(false);
  };

  const handleChangeSearch = (e) => {
    const query = e.target.value;
    var searchList = [...productState];
    console.log("seacrh", searchList);

    searchList = searchList?.filter((item) => {
      return item?.TENSP.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setSearch(searchList);
    setShow(true);
    console.log("seacrh", searchList);
  };
  function getFilterList() {
    if (!filterproduct) {
      return productState;
    }
    return productState?.filter((item) => item?.LOAISP === filterproduct);
  }

  var filterList = useMemo(getFilterList, [filterproduct, productState]);
  function handleChange(event) {
    setfilterproduct(event.target.value);
  }

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", TENSPRef.current.value);
    form.append("discount", GIAMGIARef.current.value);
    form.append("type", selectedOption?.value);
    form.append("description", MOTASPRef.current.value);
    form.append("size", KICHCORef.current.value);
    form.append("price", GIABANRef.current.value);
    form.append("status", 0);
    form.append("image", `${selectedImage}`);

    customAxios
      .post("/Product/GetProductList/addProduct.php", form, {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${form._boundary}`,
        },
      })
      .then((response) => {
        console.log("Success");
        setmodal(false);
        getproductApi();
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const handleSubmitEdit = async (item) => {
    // e.preventDefault();
    const currentImage = editProductData.IMAGE;

    // Kiểm tra xem người dùng đã chọn ảnh mới hay chưa
    if (selectedImage) {
      // Người dùng đã chọn ảnh mới, sử dụng ảnh mới
      editProductData.IMAGE = selectedImage;
    } else {
      // Người dùng không chọn ảnh mới, giữ nguyên ảnh cũ
      editProductData.IMAGE = currentImage;
    }
    const dataToSend = {
      MASP: item,
      TENSP: editProductData.TENSP, // Sử dụng giá trị ban đầu nếu không có giá trị mới
      LOAISP: editProductData.LOAISP,
      MOTASP: editProductData.MOTASP,
      GIABAN: editProductData.GIABAN,
      IMAGE: editProductData.IMAGE,
      TRANGTHAI: editProductData.TRANGTHAI,
      KICHCO: editProductData.KICHCO,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await customAxios.put(
        `/Product/GetProductList/web.php?MASP=${item}`,
        dataToSend,
        config
      );

      const result = response.data;
      console.log(result);
      setmodalEdit(false);
      // window.location.reload();
      getproductApi();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      {show === false ? (
        <div>
          {productState?.map((item, index) => (
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
                  onClick={() => handleDelete(item?.MASP)}
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
                  onClick={() => handleDelete(item?.MASP)}

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

      <div>
        <Modal
          size="lg"
          isOpen={modalEdit}
          toggle={() => setmodalEdit(!modalEdit)}
        >
          <ModalHeader toggle={() => setmodalEdit(!modalEdit)}>
            Sửa sản phẩm
          </ModalHeader>
          <ModalBody>
            {editProductData && (
              <form>
                <Row>
                  <Col lg={6}>
                    <Row>
                      <img src={editProductData?.IMAGE} />
                    </Row>
                    <Row>
                      <label>Hình ảnh: </label>
                      <br />
                      <input
                        type="file"
                        // multiple
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      {/* {selectedImage && (
                        <img src={selectedImage} alt="Selected" />
                      )} */}
                    </Row>
                  </Col>
                  <Col lg={6}>
                    <Row className="form-group">
                      <label htmlFor="TENSP">Tên sản phẩm:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="TENSP"
                        value={editProductData.TENSP}
                        onChange={(e) =>
                          setEditProductData({
                            ...editProductData,
                            TENSP: e.target.value,
                          })
                        }
                      />
                    </Row>
                    <Row className="form-group">
                      <label htmlFor="LOAISP">Loại sản phẩm:</label>
                      <Select
                        options={options}
                        value={options.find(
                          (option) => option.value === editProductData.LOAISP
                        )}
                        onChange={(selectedOption) => {
                          setEditProductData({
                            ...editProductData,
                            LOAISP: selectedOption.value,
                          });
                        }}
                      />
                    </Row>
                    <Row className="form-group">
                      <label htmlFor="LOAISP">Mô tả sản phẩm:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="LOAISP"
                        value={editProductData.MOTASP}
                        onChange={(e) =>
                          setEditProductData({
                            ...editProductData,
                            MOTASP: e.target.value,
                          })
                        }
                      />
                    </Row>
                    <Row className="form-group">
                      <label htmlFor="LOAISP">Giá bán:</label>
                      <input
                        type="number"
                        className="form-control"
                        id="LOAISP"
                        value={editProductData.GIABAN}
                        onChange={(e) =>
                          setEditProductData({
                            ...editProductData,
                            GIABAN: e.target.value,
                          })
                        }
                      />
                    </Row>
                    <Row className="form-group">
                      <label htmlFor="LOAISP">Kích cỡ:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="LOAISP"
                        value={editProductData.KICHCO}
                        onChange={(e) =>
                          setEditProductData({
                            ...editProductData,
                            KICHCO: e.target.value,
                          })
                        }
                      />
                    </Row>
                  </Col>
                </Row>
                <Button
                  type="button"
                  className="btn btn-success mt-3"
                  onClick={() => handleSubmitEdit(editProductData?.MASP)}
                >
                  <FontAwesomeIcon icon={faSave} /> Lưu thông tin
                </Button>
                <Button
                  type="button"
                  className="btn btn-danger mt-3 ml-3"
                  onClick={handleClose}
                >
                  &times; Hủy
                </Button>
                {/* Thêm các trường thông tin sản phẩm khác tương tự */}
              </form>
            )}
          </ModalBody>
        </Modal>
      </div>
      <div>
        <Modal size="lg" isOpen={modal} toggle={() => setmodal(!modal)}>
          <ModalHeader toggle={() => setmodal(!modal)}>
            Thêm sản phẩm
          </ModalHeader>
          <ModalBody>
            <form>
              <Row>
                <Col lg={12}>
                  <label>Tên sản phẩm</label>
                  <input ref={TENSPRef} type="text" className="form-control" />
                </Col>
                <Col lg={12}>
                  <label>Loại sản phẩm</label>
                  <Select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    options={options}
                    placeholder="Chọn loại sản phẩm"
                  />
                </Col>
                <Col lg={12}>
                  <label>Kích cỡ</label>
                  <input ref={KICHCORef} type="text" className="form-control" />
                </Col>
                <Col lg={12}>
                  <label>Mô tả</label>
                  <input ref={MOTASPRef} type="text" className="form-control" />
                </Col>
                <Col lg={12}>
                  <label>Giá bán</label>
                  <input
                    ref={GIABANRef}
                    type="number"
                    className="form-control"
                  />
                </Col>
                <Col lg={12}>
                  <label>Giảm giá</label>
                  <input
                    ref={GIAMGIARef}
                    type="number"
                    className="form-control"
                  />
                </Col>
                <Col lg={12}>
                  <label>Hình ảnh: </label>
                  <br />
                  <input
                    type="file"
                    // multiple
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </Col>
              </Row>
              <Button
                type="button"
                className="btn btn-success mt-3"
                onClick={handleSubmit}
              >
                <FontAwesomeIcon icon={faSave} /> Lưu thông tin
              </Button>
              <Button
                type="button"
                className="btn btn-danger mt-3 ml-3"
                onClick={handleClose}
              >
                &times; Hủy
              </Button>
            </form>
          </ModalBody>
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
              <button
                className="btn-new"
                type="button"
                onClick={() => setmodal(true)}
              >
                THÊM SẢN PHẨM
              </button>
              <form className="form-inline w-50">
                <select
                  className="browser-default custom-select mb-2 mr-3"
                  onChange={handleChange}
                >
                  <option selected disabled>
                    Lọc theo danh mục
                  </option>
                  <option value="">Tất cả</option>
                  <option value="1">Áo đội tuyển</option>
                  <option value="2">Áo CLB</option>
                  <option value="3">Áo thể thao trơn</option>
                  <option value="4">Giày đá bóng</option>
                  {/* {productState?.map((item) => (
                    <option value={item?.LOAISP}>
                      <TypeProduct item={item?.LOAISP} />
                    </option>
                  ))} */}
                </select>
              </form>
            </div>
            <div className="control-product">
              <div className="mt-3 control-product-table shadow-sm p-3 mb-5 bg-white rounded">
                <div className="item-header">
                  <h2>Danh sách sản phẩm</h2>
                  <div className="item-search">
                    <input
                      type="text"
                      className="item-search-input"
                      placeholder="Tìm kiếm ..."
                      onChange={handleChangeSearch}
                    />
                  </div>
                </div>
                <table
                  className="table recently-violated"
                  style={{ marginTop: "10px" }}
                >
                  <thead>
                    <tr>
                      <th scope="col">Hình ảnh</th>
                      <th scope="col">Mã sản phẩm</th>
                      <th scope="col">Tên sản phẩm</th>
                      <th scope="col">Loại sản phẩm</th>
                      <th scope="col">Kích cỡ</th>
                      <th scope="col">Giá</th>
                      {/* <th scope="col">Xem thêm</th> */}
                      <th scope="col">Thao tác</th>
                    </tr>
                  </thead>
                  {/* ----------------------------------------- */}
                  {show === false ? (
                    <tbody id="myTable">
                      {filterList?.map((item, index) => (
                        <tr>
                          <td>
                            <img
                              src={item?.IMAGE}
                              style={{ height: "50px", width: "50px" }}
                            />
                          </td>
                          <td>{item?.MASP}</td>
                          <td>{item?.TENSP}</td>
                          {/* <td>{item?.LOAISP}</td> */}
                          <td>
                            <TypeProduct item={item?.LOAISP} />
                          </td>
                          <td>{item?.KICHCO}</td>
                          <td>{currencyFormat(item?.GIABAN)}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-secondary btn-xs"
                              data-toggle="modal"
                              data-target="#editModal"
                              variant="primary"
                              onClick={() => handleEdit(item?.MASP)}
                            >
                              <span
                                className={{
                                  dataToggle: Tooltip,
                                  title: "Chỉnh sửa",
                                }}
                              >
                                <FontAwesomeIcon icon={faPencilSquare} />
                                Sửa
                              </span>
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-xs"
                              data-toggle="modal"
                              data-target="#delModal"
                              onClick={() => handleClickDelete(item?.MASP)}
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
                              src={item?.IMAGE}
                              style={{ height: "50px", width: "50px" }}
                            />
                          </td>
                          <td>{item?.MASP}</td>
                          <td>{item?.TENSP}</td>
                          {/* <td>{item?.LOAISP}</td> */}
                          <td>
                            <TypeProduct item={item?.LOAISP} />
                          </td>
                          <td>{item?.KICHCO}</td>
                          <td>{currencyFormat(item?.GIABAN)}</td>
                          <td>
                            <button
                              type="button"
                              className="btn btn-secondary btn-xs"
                              data-toggle="modal"
                              data-target="#editModal"
                              variant="primary"
                              onClick={() => handleEdit(item?.MASP)}
                            >
                              <span
                                className={{
                                  dataToggle: Tooltip,
                                  title: "Chỉnh sửa",
                                }}
                              >
                                <FontAwesomeIcon icon={faPencilSquare} />
                                Sửa
                              </span>
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger btn-xs"
                              data-toggle="modal"
                              data-target="#delModal"
                              onClick={() => handleClickDelete(item?.MASP)}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
