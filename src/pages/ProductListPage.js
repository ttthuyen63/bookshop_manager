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
import "react-slideshow-image/dist/styles.css";
import { useRef } from "react";
import FileResizer from "react-image-file-resizer";
import axios from "axios";
import Typeproduct from "../components/TypeProduct";
import TypeAuthor from "../components/TypeAuthor";

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
  const [selectedOptionAuthor, setSelectedOptionAuthor] = useState(null); // State để lưu giá trị đã chọn
  const GIAMGIARef = useRef(null);
  const TENSPRef = useRef(null);
  const SOLUONGRef = useRef(null);
  const GIABANRef = useRef(null);
  const MOTARef = useRef(null);
  const queryParams = new URLSearchParams(window.location.search);
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

  const options = [
    { value: 1, label: "Sách văn học" },
    { value: 2, label: "Sách kĩ năng sống" },
    { value: 3, label: "Sách lịch sử" },
    { value: 4, label: "Sách tâm lý" },
    { value: 5, label: "Sách giáo khoa" },
    { value: 6, label: "Truyện tranh" },
  ];
  const optionsAuthor = [
    { value: 1, label: "Dostoevsky" },
    { value: 2, label: "Đoàn Giỏi" },
    { value: 3, label: "Nguyễn Bảo Trung" },
    { value: 4, label: "Fujiko F Fujio" },
    { value: 5, label: "Brian Tracy" },
    { value: 6, label: "Nguyễn Nhật Ánh" },
  ];

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption); // Cập nhật giá trị đã chọn khi người dùng thay đổi
  };
  const handleSelectChangeAuthor = (selectedOptionAuthor) => {
    setSelectedOptionAuthor(selectedOptionAuthor); // Cập nhật giá trị đã chọn khi người dùng thay đổi
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
        `/Book/GetProductList/web.php?MASP=${item}`
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
        `/Book/GetProductList/web.php?MASP=${deleteCode}`
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

    searchList = searchList?.filter((item) => {
      return item?.TENSP.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setSearch(searchList);
    setShow(true);
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
    form.append("description", MOTARef.current.value);
    form.append("quantity", SOLUONGRef.current.value);
    form.append("price", GIABANRef.current.value);
    form.append("status", 0);
    form.append("image", `${selectedImage}`);
    form.append("author_id", selectedOptionAuthor?.value);

    customAxios
      .post("/Book/GetProductList/addProduct.php", form, {
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
      MATG: editProductData.MATG,
      MOTA: editProductData.MOTA,
      GIABAN: editProductData.GIABAN,
      IMAGE: editProductData.IMAGE,
      TRANGTHAI: editProductData.TRANGTHAI,
      SOLUONG: editProductData.SOLUONG,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await customAxios.put(
        `/Book/GetProductList/web.php?MASP=${item}`,
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
                      <label>Tên sản phẩm:</label>
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
                      <label>Tác giả:</label>
                      <Select
                        options={optionsAuthor}
                        value={optionsAuthor.find(
                          (option) => option.value === editProductData.MATG
                        )}
                        onChange={(selectedOptionAuthor) => {
                          setEditProductData({
                            ...editProductData,
                            MATG: selectedOptionAuthor.value,
                          });
                        }}
                      />
                    </Row>
                    <Row className="form-group">
                      <label>Phân loại:</label>
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
                      <label>Mô tả sản phẩm:</label>
                      <input
                        type="text"
                        className="form-control"
                        id="LOAISP"
                        value={editProductData.MOTA}
                        onChange={(e) =>
                          setEditProductData({
                            ...editProductData,
                            MOTA: e.target.value,
                          })
                        }
                      />
                    </Row>
                    <Row className="form-group">
                      <label>Giá bán:</label>
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
                      <label>Số lượng:</label>
                      <input
                        type="number"
                        className="form-control"
                        id="LOAISP"
                        value={editProductData.SOLUONG}
                        onChange={(e) =>
                          setEditProductData({
                            ...editProductData,
                            SOLUONG: e.target.value,
                          })
                        }
                      />
                    </Row>
                  </Col>
                </Row>
                <Row
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Button
                    type="button"
                    className="btn  mt-3"
                    style={{
                      width: "30%",
                      backgroundColor: "rgb(43, 155, 180)",
                    }}
                    onClick={() => handleSubmitEdit(editProductData?.MASP)}
                  >
                    Lưu thông tin
                  </Button>
                  <Button
                    type="button"
                    className="btn  mt-3 ml-3"
                    style={{
                      width: "30%",
                      backgroundColor: "rgb(43, 155, 180)",
                    }}
                    onClick={handleClose}
                  >
                    Hủy
                  </Button>
                </Row>
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
                  <label>Tác giả</label>
                  <Select
                    value={selectedOptionAuthor}
                    onChange={handleSelectChangeAuthor}
                    options={optionsAuthor}
                    placeholder="Tác giả"
                  />
                </Col>
                <Col lg={12}>
                  <label>Phân loại</label>
                  <Select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    options={options}
                    placeholder="Chọn thể loại"
                  />
                </Col>

                <Col lg={12}>
                  <label>Số lượng</label>
                  <input
                    ref={SOLUONGRef}
                    type="number"
                    className="form-control"
                  />
                </Col>
                <Col lg={12}>
                  <label>Mô tả</label>
                  <input ref={MOTARef} type="text" className="form-control" />
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
              <Row style={{ display: "flex", justifyContent: "space-around" }}>
                <Button
                  type="button"
                  className="btn btn-secondary mt-3"
                  onClick={handleSubmit}
                  style={{
                    width: "30%",
                    backgroundColor: "rgb(43, 155, 180)",
                  }}
                >
                  Lưu thông tin
                </Button>
                <Button
                  type="button"
                  className="btn btn-secondary mt-3 ml-3"
                  style={{
                    width: "30%",
                    backgroundColor: "rgb(43, 155, 180)",
                  }}
                  onClick={handleClose}
                >
                  Hủy
                </Button>
              </Row>
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
                  <option value="1">Sách văn học</option>
                  <option value="2">Sách kĩ năng sống</option>
                  <option value="3">Sách lịch sử</option>
                  <option value="4">Sách tâm lý</option>
                  <option value="5">Sách giáo khoa</option>
                  <option value="6">Truyện tranh</option>
                  {/* {productState?.map((item) => (
                    <option value={item?.LOAISP}>
                      <TypeProduct item={item?.LOAISP} />
                    </option>
                  ))} */}
                </select>
              </form>
            </div>
            <div className="control-product">
              <div
                className="mt-3 control-product-table shadow-sm p-3 mb-5 bg-white rounded"
                style={{ margin: "0px 10px" }}
              >
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
                      <th scope="col">Tác giả</th>
                      <th scope="col">Phân loại</th>
                      <th scope="col">Số lượng</th>
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
                              style={{ height: "90px", width: "90px" }}
                            />
                          </td>
                          <td>{item?.MASP}</td>
                          <td>{item?.TENSP}</td>
                          {/* <td>{item?.LOAISP}</td> */}
                          <td>
                            <TypeAuthor item={item?.MATG} />
                          </td>
                          <td>
                            <TypeProduct item={item?.LOAISP} />
                          </td>
                          <td>{item?.SOLUONG}</td>
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
                            <TypeAuthor item={item?.MATG} />
                          </td>
                          <td>
                            <TypeProduct item={item?.LOAISP} />
                          </td>
                          <td>{item?.SOLUONG}</td>
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
