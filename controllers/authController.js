const authController = {};
const { Usuario, Paciente, Odontologo, Role } = require("../models");
const bcrypt = require("bcrypt");
const {
  sendSuccsessResponse,
  sendErrorResponse,
} = require("../_util/sendResponse");
const { compareHash } = require("../_util/hash");
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

    return sendSuccsessResponse(res, 200, {
      message: "Usuario creado correctamente",
    });
  } catch (error) {
    return sendErrorResponse(res, 500, "Algo salió mal", error);
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

    const nuevoUsuario = await Usuario.create({
      nombre: nombre,
      apellidos: apellidos,
      telefono: telefono,
      email: email,
      password: encryptedPassword,
      fecha_de_nacimiento: fecha_de_nacimiento,
      id_role: 3,
    });
    await Odontologo.create({
      id_usuario: nuevoUsuario.id,
      matriculaOdontologo: matriculaOdontologo,
    });

    return sendSuccsessResponse(res, 200, {
      message: "Odontologo creado correctamente",
    });
  } catch (error) {
    return sendErrorResponse(res, 500, { message: "Algo salió mal", error });
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
    const usuario = await Usuario.findOne({ where: { email: email }, include: [{ model: Role,}] });
    if (!usuario) {
      return sendErrorResponse(res, 404, "Email o contraseña incorrecta");
    }
    const isValidPassword = compareHash(password, usuario.password);
    if (!isValidPassword) {
      return sendErrorResponse(res, 401, "Email o contraseña incorrecta");
    }
    const token = generateToken({
      usuario_id: usuario.id,
      usuario_role: usuario.Role.rolUsuario,
      usuario_name: usuario.nombre,
    });
    // let role;
    // if (usuario.id_role == 1) {
    //   role = "user";
    // } else if (usuario.id_role == 2) {
    //   role = "admin";
    // } else if (usuario.id_role == 3) {
    //   role = "odontologo";
    // }
    sendSuccsessResponse(res, 200, {
      message: "Inicio de sesión de usuario exitoso",
      token: token,
      role: usuario.Role.rolUsuario,
    });
  } catch (error) {
    sendErrorResponse(res, 500, "Inicio de sesión de usuario fallido", error);
  }
};

module.exports = authController;
