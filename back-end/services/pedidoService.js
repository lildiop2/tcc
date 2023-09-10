const { Pedido } = require('../database/sequelize')
const { Op } = require('sequelize');




exports.listarTodosOsPedidos = async () => {
    return  await Pedido.findAll();
}

exports.retornarPedidoPorId = async (id) => {
    return await Pedido.findByPk(id);
}

exports.adicionarPedido = async (data) => {
    console.log('data :>> ', data);
    return await Pedido.create({ data });
}

exports.atualizarPedido = async (data, id) => {
  
    const [atualizado] = await Pedido.update({ data }, {
        where: { id: id }
    });

    if (atualizado) return  await Pedido.findByPk(id);
    return;
}


exports.removerPedido = async (id) => {
    return await Pedido.destroy({ where: { id: id } });
}

exports.adicionarItem= async(idProduto)=>{
    return false;
}

exports.removerItem= async(idProduto)=>{
    return false;
}

exports.obterTotalPedido= async(id)=>{
    return;
}