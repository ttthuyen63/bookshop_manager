import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import store from "./redux/store";
import ProtectRouter from "./components/ProtectRouter";
import RoomListPage from "./pages/UserListPage";
import ProductListPage from "./pages/ProductListPage";
import OrderPage from "./pages/orderPage";
import UserListPage from "./pages/UserListPage";
// import HotelDetail from "./pages/hotelDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRouter>
        <HomePage />,
      </ProtectRouter>
    ),
  },

  {
    path: "/userList",
    element: (
      <ProtectRouter>
        <UserListPage />
      </ProtectRouter>
    ),
  },
  {
    path: "/productList",
    element: (
      <ProtectRouter>
        <ProductListPage />
      </ProtectRouter>
    ),
  },
  // {
  //   path: "/hotelList/:code",
  //   element: (
  //     <ProtectRouter>
  //       <HotelDetail />
  //     </ProtectRouter>
  //   ),
  // },
  {
    path: "/order",
    element: (
      <ProtectRouter>
        <OrderPage />
      </ProtectRouter>
    ),
  },

  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* // <Provider> */}
    <RouterProvider router={router} />
    {/* <App /> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
