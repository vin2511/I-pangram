import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Header from "./components/Header";
import AddDepartment from "./pages/department/AddDepartment";
import ViewManager from "./pages/department/ViewDepartment";
import EditDepartment from "./pages/department/EditDepartment";
import ViewEmployee from './pages/employees/ViewEmployee';
import EmployeelistById from './pages/employees/EmployeelistById'
import Protected from "./auth/Protected";
function App() {
  const location = useLocation()
  return (
    <div className="App">
      <ToastContainer autoClose={2000} />
      {
        location.pathname === '/' ? (<Login />) :
          <Routes>
            <Route path="/" element={<Protected Component={Header} />} />
            <Route path="/register" element={<SignUp />} />
            <Route path='/add' element={<Protected Component={AddDepartment} />} />
            <Route path='/edit' element={<Protected Component={EditDepartment} />} />
            <Route path='/view' element={<Protected Component={ViewManager} />} />
            <Route path='/viewemployee' element={<Protected Component={ViewEmployee} />} />
            <Route path='/employeelist' element={<Protected Component={EmployeelistById} />} />
          </Routes>
      }
    </div>
  );
}

export default App;
