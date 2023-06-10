const connection = require("../model/dbConfig");
const uuid = require("uuid");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getEmployee = async (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM employees";
    connection.query(sqlQuery, (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ data: null, Message: err.message, Status: false });
      } else {
        console.log("Result", result);
        return res
          .status(200)
          .json({ data: result, Message: "", Status: true });
      }
    });
  } catch (err) {
    res.status(500).json({ data: null, Message: err.message, Status: false });
  }
};

const signUp = async (req, res) => {
  try {
    const { firstname, lastname, gender, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    const data = {
      emp_id: uuid.v4(),
      firstname,
      lastname,
      gender,
      email,
      password: hashpassword,

    };

    const sqlQuery = "INSERT INTO employees SET?";
    connection.query(sqlQuery, data, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  } catch (err) {
    console.log("error", err.message);
  }
};


let login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const sqlQuery = `SELECT r.role_name,e.password, e.firstname,e.lastname,e.email,e.gender,e.hobbies FROM employees e JOIN role_assign ra ON e.emp_id = ra.emp_id JOIN role r ON ra.role_id = r.role_id WHERE e.email = ?`;

    await connection.query(sqlQuery, email, async (err, result) => {
      if (err) {
        return res.json({ status: 400, response: err.sqlMessage });
      }
      const dbPassword = result[0] ? result[0].password : "";
      // const dbPassword = result[0].password;
      const passwordCheck = await bcrypt.compare(password, dbPassword);

      if (passwordCheck === false) {
        return res.json({ status: 400, response: "InCorrect password" });
      }
      let token;
      if (result[0].rolename === "manager") {
        token = await jwt.sign(
          { emp_id: result[0].emp_id, rolename: result[0].rolename },
          process.env.SECRET_KEY
        );
      } else if (result[0].rolename === "employee") {
        token = await jwt.sign(
          { emp_id: result[0].emp_id, rolename: result[0].rolename },
          process.env.SECRET_KEY
        );
      }

      res.json({
        status: 200,
        response: "logged in Successfully",
        token,
        user: result[0],
      });
    });
  } catch (err) {
    res.json({ status: 400, response: err.message });
  }
};

const viewRole = async (req, res) => {
  try {
    const sqlQuery = "SELECT * FROM role";
    await connection.query(sqlQuery, (err, result) => {
      if (err) {
        return res.send({ status: 400, Error: err.message });
      }
      res.send({ status: 200, response: result });
    });
  } catch (err) {
    res.send({ status: 400, Error: err.message });
  }
};

const viewSelectRole = async (req, res) => {
  try {
    const Id = req.params.emp_id;
    const sqlQuery = `SELECT role_id,role_name FROM role NATURAL JOIN role_assign Where emp_id=?`;
    await connection.query(sqlQuery, [Id], (err, result) => {
      if (err) {
        return res.send({ status: 400, Error: err.message });
      }
      res.send({ status: 200, response: result });
    });
  } catch (err) {
    res.send({ status: 400, Error: err.message });
  }
};

const addRole = async (req, res) => {
  try {
    const min = 1000000; // Minimum 7-digit value
    const max = 9999999; // Maximum 7-digit value

    const randomId = Math.floor(Math.random() * (max - min + 1) + min);
    const role_id = randomId.toString();
    const data = {
      role_id: role_id,
      role_name: req.body.role_name,
    };
    console.log("data", data);
    const sqlQuery = "INSERT INTO role SET ?";
    await connection.query(sqlQuery, data, (err, result) => {
      if (err) {
        return res.send({ status: 400, Error: err.message });
      }
      res.send({ status: 200, response: result });
    });
  } catch (err) {
    res.send({ status: 400, Error: err.message });
  }
};

const roleAssign = async (req, res) => {
  try {
    const data = req.body;
    const sqlQuery = "INSERT INTO role_assign SET ?";
    await connection.query(sqlQuery, data, (err, result) => {
      if (err) {
        return res.send({ status: 400, Error: err.message });
      }
      res.send({ status: 200, response: result });
    });
  } catch (err) {
    res.send({ status: 400, Error: err.message });
  }
};

const deleteRole = async (req, res) => {
  try {
    const roleid = req.params.roleid;

    const sqlQuery = `DELETE FROM role_assign WHERE roleid =${roleid}`;
    await connection.query(sqlQuery, (err, result) => {
      if (err) {
        return res.send({ status: 400, Error: err.message });
      }
      res.send({ status: 200, response: result });
    });
  } catch (err) {
    res.send({ status: 400, Error: err.message });
  }
};

module.exports = {
  getEmployee,
  signUp,
  viewRole,
  addRole,
  viewSelectRole,
  roleAssign,
  deleteRole,
  login
};
