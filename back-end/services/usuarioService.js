const bcrypt = require('bcrypt');
const { Usuario } = require('../database/sequelize')
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');


exports.listarTodosOsUsuarios = async ()=>{
    let usuarios= await Usuario.findAll();
    return usuarios.map((usuario)=>{
        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.tipo,
            createdAt: usuario.createdAt,
            updatedAt: usuario.updatedAt
        };
    })
}

exports.retornarUsuarioPorId = async (id)=>{
    return  await Usuario.findByPk(id);
}

exports.adicionarUsuario= async (usuario)=>{
    let { nome, email, senha } = usuario;
    const achado = await Usuario.findOne({ where: { email: email } });

    if (!achado) {
        let hash = await bcrypt.hash(senha, 10);
        const usuario = await Usuario.create({ nome, email, senha:hash });
        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.tipo,
            createdAt: usuario.createdAt,
            updatedAt: usuario.updatedAt
           
        };
    }
    return;
}

exports.atualizarUsuario= async (usuario,id)=> {
    let { nome, email, tipo } = usuario;
        const [atualizado] = await Usuario.update({ nome, email, tipo }, {
            where: { id: id }
        });
        if (atualizado) {
            let usuario= await Usuario.findByPk(id);
            return {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo,
                createdAt: usuario.createdAt,
                updatedAt: usuario.updatedAt
               
            };
        }
        return;
}

exports.trocarSenha = async (id,senha)=>{
    let hash = await bcrypt.hash(senha, 10);
    const [atualizado] = await Usuario.update({ senha:hash}, {
        where: { id: id }
    });
    if (atualizado) {
        let usuario= await Usuario.findByPk(id);
        return {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipo: usuario.tipo,
            createdAt: usuario.createdAt,
            updatedAt: usuario.updatedAt
           
        };
    }
    return;
}


exports.removerUsuario = async (id) =>{
return   await Usuario.destroy({ where: { id: id } });
}

exports.login=async (email,senha)=>{
    const usuario = await Usuario.findOne({ where: { email } });
    if (usuario) {
        let success = await bcrypt.compare(senha, usuario.senha);
        if (success) {
            const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, process.env.JWT_SECRET);
            return token;
        }
    }
    return;
}