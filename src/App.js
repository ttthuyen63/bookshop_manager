import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import { Container } from "react-bootstrap";
import "boxicons/css/boxicons.min.css";
import RoomListPage from "./pages/UserListPage";

function App() {
  return (
    <Container>
      <HomePage />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/roomList" element={<RoomListPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
