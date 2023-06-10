const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json())

app.use(cors());

const {EmployeeRouter} = require('./routes/employeeRoute')
app.use(EmployeeRouter);

const {DepartmentRouter} = require ('./routes/departmentRoute');
app.use(DepartmentRouter)

app.listen( 4004,()=>{
    console.log("Server is running")
})    