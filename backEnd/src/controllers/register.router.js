const User = require("../models/User");
const bcrypt = require("bcrypt");

class RegisterController {
  async create(req, res) {
    const { login, email, password, confirmationPassword } = req.body;
    try {
      const emailExist = await User.findOne({ where: { email } });
      if (emailExist) {
        res.status(400).json({ message: "Email já existe" });
      }

      const loginExist = await User.findOne({ where: { login } });
      if (loginExist) {
        res.status(400).json({ message: "Login já existe" });
      }

      if (password != confirmationPassword) {
        res.status(400).json({ message: "As senhas não batem" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        email,
        login,
        password: hashedPassword,
      });

      res.status(201).json({ message: "Usuário criado com sucesso", newUser });
    } catch (error) {
      console.error("Erro ao registrar o usuário: ", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

module.exports = RegisterController;
