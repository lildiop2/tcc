const { Carrinho } = require('../database/sequelize')
const { Op } = require('sequelize');
const fs = require('fs');
const crypto = require('crypto');



exports.listarTodosOsCarrinhos = async () => {
   return await Carrinho.findAll();
}

exports.retornarCarrinhoPorId = async (id) => {
   return await Carrinho.findByPk(id);
}

exports.adicionarCarrinho = async () => {
   
    return await Carrinho.create({ qtq:0, preco:0.00});
}

exports.atualizarCarrinho = async (id) => {
   
    //remover a imagem antiga
    let achado = await Carrinho.findByPk(id);
    let qtd=Number((Math.random()*100).toFixed(0));
    let preco=Number((Math.random()*100).toFixed(2));
    const [atualizado] = await Carrinho.update({ qtd,  preco }, {
        where: { id: id }
    });

    if (atualizado) return  await Carrinho.findByPk(id);
       
    return;
}


exports.removerCarrinho = async (id) => {
    return await Carrinho.destroy({ where: { id: id } });
}
