const { sendErrorResponse } = require("../_util/sendResponse");
const isPatient = async (req, res, next) => {
  const { usuario_role } = req;
  if (usuario_role != "user") {
    return sendErrorResponse(res, 403, "No tiene los permisos necesarios");
  } else next();
};
module.exports = isPatient;