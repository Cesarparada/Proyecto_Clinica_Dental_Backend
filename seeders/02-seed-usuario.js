"use strict";
const { Op } = require("sequelize");
const { hash } = require("../_util/hash");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "usuarios",
      [
        {
          nombre: "Jose",
          apellidos: "Palacios",
          fecha_de_nacimiento: "1996-05-01",
          email: "jose@correo.com",
          telefono: 1233456789,
          password: hash("12345678"),
          createdAt: new Date(),
          updatedAt: new Date(),
          id_role: 1,
        },
        {
          nombre: "Marta",
          apellidos: "Garcia",
          fecha_de_nacimiento: "2002-09-10",
          email: "marta@correo.com",
          telefono: 1233456789,
          password: hash("12345678"),
          createdAt: new Date(),
          updatedAt: new Date(),
          id_role: 1,
        },
        {
          nombre: "Pepita",
          apellidos: "Rodriguez",
          fecha_de_nacimiento: "1966-07-23",
          email: "pepita@correo.com",
          telefono: 1233456789,
          password: hash("12345678"),
          createdAt: new Date(),
          updatedAt: new Date(),
          id_role: 1,
        },
        {
          nombre: "Pepa",
          apellidos: "Pérez",
          fecha_de_nacimiento: "1966-07-23",
          email: "pepa@correo.com",
          telefono: 1233456789,
          password: hash("12345678"),
          createdAt: new Date(),
          updatedAt: new Date(),
          id_role: 1,
        },
        {
          nombre: "Carlos",
          apellidos: "Cabrera",
          fecha_de_nacimiento: "1966-07-23",
          email: "carlos@correo.com",
          telefono: 1233456789,
          password: hash("12345678"),
          createdAt: new Date(),
          updatedAt: new Date(),
          id_role: 1,
        },
        {
          nombre: "Liz",
          apellidos: "Pastran",
          fecha_de_nacimiento: "1966-07-23",
          email: "liz@correo.com",
          telefono: 1233456789,
          password: hash("12345678"),
          createdAt: new Date(),
          updatedAt: new Date(),
          id_role: 1,
        },
        {
          nombre: "Odontologo Miguel",
          apellidos: "Messeger",
          fecha_de_nacimiento: "1966-07-23",
          email: "miguel@correo.com",
          telefono: 1233456789,
          password: hash("12345678"),
          createdAt: new Date(),
          updatedAt: new Date(),
          id_role: 3,
        },
        {
          nombre: "Odontologo Ernesto",
          apellidos: "Pérez",
          fecha_de_nacimiento: "1966-07-23",
          email: "enersto@corrreo.com",
          telefono: 1233456789,
          password: hash("12345678"),
          createdAt: new Date(),
          updatedAt: new Date(),
          id_role: 3,
        },
        {
          nombre: "Odontologo juan",
          apellidos: "Pérez",
          fecha_de_nacimiento: "1966-07-23",
          email: "juan@correo.com",
          telefono: 1233456789,
          password: hash("12345678"),
          createdAt: new Date(),
          updatedAt: new Date(),
          id_role: 3,
        },
        {
          nombre: "Admin. Pepe",
          apellidos: "Pérez",
          fecha_de_nacimiento: "1966-07-23",
          email: "pepe@correo.com",
          telefono: 1233456789,
          password: hash("12345678"),
          createdAt: new Date(),
          updatedAt: new Date(),
          id_role: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {},
};
