const connection = require("../database/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();

  const query = `SELECT * FROM users WHERE email=?`;
  const data = [email];
  connection.query(query, data, (err, results) => {
    console.log(results);
    if (err) throw err;
    if (results.length > 0) {
      bcrypt.compare(password, results[0].password, (err, response) => {
        if (err) res.json(err);
        if (response) {
          const paylod = {
            userId: results[0].id,
            Phone_number: results[0].Phone_number,
          };
          const secret = process.env.SECRET;

          const token = jwt.sign(paylod, secret);

          res.status(200).json(token);
        } else {
          res
            .status(403)
            .json({
              success: false,
              message: `The password you’ve entered is incorrect`,
              err,
            });
        }
      });
    } else {
      res
        .status(404)
        .json({ success: false, massege: "The email doesn't exist", err });
    }
  });
};

module.exports = {
  login,
};
