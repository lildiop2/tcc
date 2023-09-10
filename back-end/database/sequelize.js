// require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    pool: {
        max: 50,
        min: 0,
        acquire: 1200000,
        idle: 1000000,
    },
    query:{raw:true}
});

(async () => {
    try {

        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // await sequelize.sync({ alter: true });
  
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

//modelo Usuario
const Usuario = sequelize.define('Usuario', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true

    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false

    },
    tipo: {
        type: DataTypes.STRING,
        defaultValue: 'cliente'
    }
}, {
    freezeTableName: true
    // Other model options go here
});

//modelo Produto
const Produto = sequelize.define('Produto', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false

    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: false

    },
    preco: {
        type: DataTypes.FLOAT,
        defaultValue: 0.00

    },
    imagem: {
        type:  DataTypes.STRING
    }
}, {
    freezeTableName: true
    // Other model options go here
});

const Carrinho = sequelize.define('Carrinho', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    qtd: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    preco: {
        type: DataTypes.FLOAT,
        defaultValue: 0.00
    }
}, {
    freezeTableName: true
    // Other model options go here
});

const Pedido = sequelize.define('Pedido', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    data: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.STRING
    },
},
    {
        freezeTableName: true
        // Other model options go here
    });
// Definir os modelos das tabelas
const Categoria = sequelize.define('Categoria', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false

    },
  });

// Definir as relações entre as tabelas
Categoria.hasMany(Produto, { foreignKey: 'categoriaId' });
Produto.belongsTo(Categoria, { foreignKey: 'categoriaId' });

Carrinho.hasMany(Produto, { foreignKey: 'carrinhoId' });
Carrinho.belongsTo(Pedido, { foreignKey: 'pedidoId' });
Produto.belongsTo(Carrinho, { foreignKey: 'carrinhoId' });

Pedido.belongsTo(Usuario, { foreignKey: 'usuarioId' });
Usuario.hasMany(Pedido, { foreignKey: 'usuarioId' });




module.exports = {Usuario, Produto, Categoria, Pedido, Carrinho};