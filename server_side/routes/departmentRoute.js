const express = require("express");

DepartmentRouter = express.Router();

const {
  addDepartment,
  getLimitEmployee,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departments");

DepartmentRouter.post("/company/adddepartment", addDepartment);
DepartmentRouter.get("/company/getlimitemployee", getLimitEmployee);
DepartmentRouter.put("/company/updatedepartment/:id", updateDepartment);
DepartmentRouter.delete("/company/deletedepartment/:id", deleteDepartment);

module.exports = { DepartmentRouter };
