const Sequelize = require("sequelize");
const UserModel = require("./user");

// connection to the database
const db = new Sequelize({
  database: "express_auth_db",
  dialect: "postgres"
});

const User = UserModel(db, Sequelize);

module.exports = {
  db,
  User
};
