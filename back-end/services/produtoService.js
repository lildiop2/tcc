const { Produto } = require('../database/sequelize')
const { Op } = require('sequelize');
const fs = require('fs');
const crypto = require('crypto');



exports.listarTodosOsProdutos = async () => {
    const produtos = await Produto.findAll();
    return produtos.map((produto) => {
        return {
            "id": produto.id,
            "nome": produto.nome,
            "desc": produto.desc,
            "preco": produto.preco,
            "imagem": process.env.SERVER_URL + "/" + produto.imagem,
            "createdAt": produto.createdAt,
            "updatedAt": produto.updatedAt
        }
    })
}
exports.listarProdutosPorQuantidade = async (quantidade) => {
    const produtos = await Produto.findAll({limit : quantidade});
    return produtos.map((produto) => {
        return {
            "id": produto.id,
            "nome": produto.nome,
            "desc": produto.desc,
            "preco": produto.preco,
            "imagem": process.env.SERVER_URL + "/" + produto.imagem,
            "createdAt": produto.createdAt,
            "updatedAt": produto.updatedAt
        }
    })
}
exports.retornarProdutoPorId = async (id) => {
    let produto = await Produto.findByPk(id);
    return {
        "id": produto.id,
        "nome": produto.nome,
        "desc": produto.desc,
        "preco": produto.preco,
        "imagem": process.env.SERVER_URL + "/" + produto.imagem,
        "createdAt": produto.createdAt,
        "updatedAt": produto.updatedAt
    }
}

exports.adicionarProduto = async (novoProduto) => {
    let { nome, desc, preco, imagem } = novoProduto;
    // console.log('produto :>> ', novoProduto);
    // new Uint8Array(JSON.parse(dataString)).buffer
    let bufferOriginal = Buffer.from(new Uint8Array(JSON.parse(imagem)));
    let path = 'images/produto/' + crypto.randomUUID() + ".jpg";
    fs.writeFileSync(`public/${path}`, bufferOriginal);
    let produto = await Produto.create({ nome, desc, preco, imagem: path });
    return {
        "id": produto.id,
        "nome": produto.nome,
        "desc": produto.desc,
        "preco": produto.preco,
        "imagem": process.env.SERVER_URL + "/" + produto.imagem,
        "createdAt": produto.createdAt,
        "updatedAt": produto.updatedAt
    }
}

exports.atualizarProduto = async (produto, id) => {
    let { nome, desc, preco, imagem } = produto;
    //remover a imagem antiga
    let achado = await Produto.findByPk(id);
    fs.unlinkSync(`public/${achado.imagem}`);
    //salvar a nova
    let bufferOriginal = Buffer.from(new Uint8Array(JSON.parse(imagem)));
    let path = 'images/produto/' + crypto.randomUUID() + ".jpg";
    fs.writeFileSync(`public/${path}`, bufferOriginal);
    const [atualizado] = await Produto.update({ nome, desc, preco, imagem: path }, {
        where: { id: id }
    });

    if (atualizado) {
        let produto = await Produto.findByPk(id);
        return {
            "id": produto.id,
            "nome": produto.nome,
            "desc": produto.desc,
            "preco": produto.preco,
            "imagem": process.env.SERVER_URL + "/" + produto.imagem,
            "createdAt": produto.createdAt,
            "updatedAt": produto.updatedAt
        }


    }
    return;
}


exports.removerProduto = async (id) => {
    //remover a imagem antiga
    let achado = await Produto.findByPk(id);
    fs.unlinkSync(`public/${achado.imagem}`);
    return await Produto.destroy({ where: { id: id } });
}
