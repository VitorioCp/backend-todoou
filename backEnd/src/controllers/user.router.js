const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserController {
  async create(req, res) {
    const { login, password } = req.body;
    try {
      const user = await User.findOne({ where: { login } });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Username or password is not correct" });
      }

      const isPassword = await bcrypt.compare(password, user.password);

      if (!isPassword) {
        return res
          .status(401)
          .json({ message: "Username or password is not correct" });
      }

      const token = jwt.sign(
        {
          login: user.login,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor", error });
    }
  }
  async getOne(req, res) {
    const { login } = req.params; // Pegando o login dos parâmetros da URL

    try {
      const user = await User.findOne({ where: { login } });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({ email: user.email });
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
}

module.exports = UserController;
