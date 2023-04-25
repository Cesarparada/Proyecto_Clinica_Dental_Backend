const authController = {};
const { Usuario, Paciente, Odontologo } = require("../models");
const bcrypt = require("bcrypt");
const {
  sendSuccsessResponse,
  sendErrorResponse,
} = require("../_util/sendResponse");
const { compareHash, hash } = require("../_util/hash");
const { generateToken } = require("../_util/token");

//registro de usuarios
authController.register = async (req, res) => {
  try {
    const {
      nombre,
      apellidos,
      telefono,
      email,
      password,
      fecha_de_nacimiento,
    } = req.body;

    const encryptedPassword = bcrypt.hashSync(password, 10);

    if (nombre === undefined || email === undefined || password === undefined) {
      return res.json({
        success: false,
        message: "Debe completar correctamente todos los campos requeridos",
      });
    }
    const nuevoUsuario = await Usuario.create({
      nombre: nombre,
      apellidos: apellidos,
      telefono: telefono,
      email: email,
      password: encryptedPassword,
      fecha_de_nacimiento: fecha_de_nacimiento,
      id_role: 1, 
    });
    const nuevoPaciente = await Paciente.create({
      id_usuario: nuevoUsuario.id,
    });

    return res.json({
      success: true,
      message: "Usuario creado correctamente"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Algo salió mal",
      error: error.message,
    });
  }
};

// registro de odontologo
authController.registerOdontologo = async (req, res) => {
  try {
    const {
      nombre,
      apellidos,
      telefono,
      matriculaOdontologo,
      email,
      password,
      fecha_de_nacimiento,
    } = req.body;

    const encryptedPassword = bcrypt.hashSync(password, 10);

    if (nombre === undefined || email === undefined || password === undefined) {
      return res.json({
        success: false,
        message: "Debe completar correctamente todos los campos requeridos",
      });
    }
    const nuevoUsuario = await Usuario.create({
      nombre: nombre,
      apellidos: apellidos,
      telefono: telefono,
      email: email,
      password: encryptedPassword,
      fecha_de_nacimiento: fecha_de_nacimiento,
      id_role: 1,
    });
    await Odontologo.create({
      id_usuario: nuevoUsuario.id, matriculaOdontologo: matriculaOdontologo
    });

    return res.json({
      success: true,
      message: "Odontologo creado correctamente"
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Algo salió mal",
      error: error.message,
    });
  }
};

//controlador de login
authController.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return sendErrorResponse(
      res,
      400,
      "Debe completar los campos requeridos correctamente"
    );
  }
  try {
    const usuario = await Usuario.findOne({ where: { email: email } });
    if (!usuario) {
      return sendErrorResponse(res, 404, "Email no existente");
    }
    const isValidPassword = compareHash(password, usuario.password);
    if (!isValidPassword) {
      return sendErrorResponse(res, 401, "Contraseña incorrecta");
    }
    const token = generateToken({
      usuario_id: usuario.id,
      usuario_role: usuario.id_role,
    });
    let role;
    if (usuario.id_rol == 1) {
      role = "user";
    } else if (usuario.id_rol == 2) {
      role = "admin";
    }
    sendSuccsessResponse(res, 200, {
      message: "Inicio de sesión de usuario exitoso",
      token: token,
      role: role,
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Inicio de sesión de usuario fallido", error);
  }
};

module.exports = authController;