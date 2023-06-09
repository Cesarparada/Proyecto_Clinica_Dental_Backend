const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const isAdmin = require("../middleware/isAdmin");

/* GET users listing. */

//obtener todos los usuarios
router.get("/", verifyToken, isAdmin, userController.getAll);

// visualizar el perfil de usuario
router.get("/getprofile", verifyToken, userController.getProfile);

//modificar usuario
router.put("/updateprofile", verifyToken, userController.updateProfile);

module.exports = router;
