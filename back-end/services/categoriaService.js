const { Categoria } = require('../database/sequelize')
const { Op } = require('sequelize');



exports.listarTodosOsCategorias = async () => {
    return  await Categoria.findAll();
}

exports.retornarCategoriaPorId = async (id) => {
   return  await Categoria.findByPk(id);
}

exports.adicionarCategoria = async (nome) => {
    return await  Categoria.create({ nome });
}

exports.atualizarCategoria = async (nome, id) => {
    const [atualizado] = await Categoria.update({ nome }, {
        where: { id: id }
    });

    if (atualizado) return  await Categoria.findByPk(id);
    return;
}


exports.removerCategoria = async (id) => {
    return await Categoria.destroy({ where: { id: id } });
}
