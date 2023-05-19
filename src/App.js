import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import ProtectedRoutes from "./middleware/ProtectedRoutes";
import UsersList from "./Pages/UsersList";
import Homepage from "./Pages/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/users" element={<UsersList />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/homepage" element={<Homepage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
