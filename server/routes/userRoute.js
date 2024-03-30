const express = require('express');
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/users",userController.getAllUsers);
router.get("/users/:userId",userController.getUserById);
router.post("/users",userController.createUser);
router.put("/users/:userId",userController.updateUserById);
router.delete("/users/:userId",userController.deleteUserById);
router.get("/users/roles", userController.getAllRoles);
router.put("/users/:userId/roles", userController.updateUserRolesById);

module.exports = router;