// require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port:process.env.DB_PORT,
    dialect: 'mysql',
    pool: {
        max: 50,
        min: 0,
        acquire: 1200000,
        idle: 1000000,
    }
});

(async () => {
    try {

        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // await sequelize.sync({ alter: true });
        // const abdul = await Usuario.create({ email: "abdul.alexis@vinaprannakem.com", senha: 1234567 });
        // const teste = await Usuario.create({ email: "teste@vinaprannakem.com", senha: 1234567 });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

// //modelo Usuario
// const User = sequelize.define('users', {
//     // Model attributes are defined here
//     email: {
//         type: DataTypes.STRING,
//         primaryKey: true
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false

//     },
//     isAdmin: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: false
//     }
// }, {
//     freezeTableName: true
//     // Other model options go here
// });

// (async() => {
//     // Usuario.hasMany(Consumida)
//     // Consumida.belongsTo(Usuario)

//     // await sequelize.sync({ alter: true });

//     // Usuario.drop()

//     // Code here

//     await sequelize.sync();
//     const eu = await Usuario.create({
//         email: 'lildiop2@gmail.com',
//     });

//     console.log(eu.toJSON());
// })();

module.exports = { sequelize };