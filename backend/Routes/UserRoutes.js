const express = require('express');
const router = express.Router();

//Import User Controller and Middleware
const UserController = require("../Controllers/UserControllers");
const { protect, isAdmin } = require('../middleware/authMiddleware');

// Public Routes
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);

// Protected User Route
router.get('/profile', protect, UserController.getMyProfile);

// Protected Admin Routes
router.post("/", protect, isAdmin, UserController.addUsers); // Admin creates user
router.get("/", protect, isAdmin, UserController.getAllUsers);
router.get("/:id", protect, isAdmin, UserController.getById);
router.put("/:id", protect, isAdmin, UserController.updateUser);
router.delete("/:id", protect, isAdmin, UserController.deleteUser);


module.exports = router;


