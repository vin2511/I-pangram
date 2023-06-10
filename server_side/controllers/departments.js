const connection = require("../model/dbConfig");

const addDepartment = async (req, res) => {
  try {
    const { departmentName, categoryName, location, salary, emp_id } = req.body;

    const sqlQuery3 = `INSERT INTO departments (departmentName, categoryName, location, salary, emp_id) VALUES (?, ?, ?, ?, ?)`;
    connection.query(
      sqlQuery3,
      [departmentName, categoryName, location, salary, emp_id],
      (err, result) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).json({ message: "Department created successfully" });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

///pagination
const getLimitEmployee = async (req, res) => {
  try {
    const { page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;

    const sqlQuery4 = `SELECT * FROM departments LIMIT ?, ?`;
    connection.query(sqlQuery4, [offset, parseInt(limit)], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        const countQuery = `SELECT COUNT(*) AS totalCount FROM departments`;
        connection.query(countQuery, (err, countResult) => {
          if (err) {
            res.status(500).json({ error: err.message });
          } else {
            const totalCount = countResult[0].totalCount;
            const totalPages = Math.ceil(totalCount / limit);

            res.status(200).json({
              totalCount,
              totalPages,
              currentPage: parseInt(page),
              result,
            });
          }
        });
      }
    });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { departmentName, categoryName, location, salary, emp_id } = req.body;
    const { id } = req.params;

    const sqlQuery5 = `UPDATE departments SET departmentName = ?, categoryName = ?, location = ?, salary = ?, emp_id = ? WHERE id = ${id}`;
    connection.query(
      sqlQuery5,
      [departmentName, categoryName, location, salary, emp_id, id],
      (err, result) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.status(200).json({ message: "Department updated successfully" });
        }
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const sqlQuery6 = `DELETE FROM departments WHERE id = ${id}`;
  connection.query(sqlQuery6, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ message: "Department deleted successfully" });
    }
  });
};

module.exports = {
  getLimitEmployee,
  addDepartment,
  updateDepartment,
  deleteDepartment,
};
