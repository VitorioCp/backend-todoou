const express = require("express");
const router = express.Router();
const UserController = require("./controllers/user.router");
const RegisterController = require("./controllers/register.router");
const authMiddleware = require("./middlewares/authMiddleware");
const TaskController = require("./controllers/task.router");
const GroupTasksController = require("./controllers/groupTasks.router");

const userController = new UserController();
router.post("/user", (req, res) => userController.create(req, res));

const registerController = new RegisterController();
router.post("/register", (req, res) => registerController.create(req, res));

const taskController = new TaskController();
router.post("/task", authMiddleware, (req, res) =>
  taskController.create(req, res)
);

router.get("/task", (req, res) => taskController.getAll(req, res));

router.get("/task/:id", (req, res) => taskController.getOne(req, res));

router.put("/task/:id", authMiddleware, (req, res) =>
  taskController.update(req, res)
);

router.delete("/task/:id", authMiddleware, (req, res) =>
  taskController.delete(req, res)
);

const groupTasksController = new GroupTasksController();
router.post("/grouptasks", authMiddleware, (req, res) =>
  groupTasksController.create(req, res)
);

router.get("/grouptasks", authMiddleware, (req, res) =>
  groupTasksController.getAll(req, res)
);

router.put("/grouptasks/:id", authMiddleware, (req, res) =>
  groupTasksController.put(req, res)
);

router.delete("/grouptasks/:id", authMiddleware, (req, res) =>
  groupTasksController.delete(req, res)
);

router.get("/auth", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Token válido", user: req.user });
});

module.exports = router;
