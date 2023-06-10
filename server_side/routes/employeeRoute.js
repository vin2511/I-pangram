const express = require("express");
const EmployeeRouter = express.Router();
const {
  getEmployee,
  signUp,
  viewRole,
  addRole,
  viewSelectRole,
  roleAssign,
  deleteRole,
  login

} = require("../controllers/employee");

EmployeeRouter.get("/company/getallemployee", getEmployee);
EmployeeRouter.post("/company/signup", signUp);
EmployeeRouter.get('/company/viewrole', viewRole);
EmployeeRouter.post('/company/addrole', addRole);
EmployeeRouter.get('/company/viewselectedrole/:emp_id', viewSelectRole);
EmployeeRouter.post('/company/roleassign', roleAssign);
EmployeeRouter.delete('/company/deleterole/:role_id', deleteRole);
EmployeeRouter.post("/company/login",login);


module.exports = { EmployeeRouter };
