const usuarioService = require('../services/usuarioService');
//logar
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;
        const token = await usuarioService.login(email,senha);
        if (token) {
            return res.json({ token });  
        } 
        return res.status(400).json({mensagem:'Usuário ou senha inválidos'});
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }

}
//listar usuario
exports.listarTodosOsUsuarios = async (req, res) => {
    try {
        return res.json(await usuarioService.listarTodosOsUsuarios());
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//get usuario by id
exports.retornarUsuarioPorId = async (req, res) => {
    try {
        const usuario = await usuarioService.retornarUsuarioPorId(req.params.id);
        if (usuario) return res.json(usuario);
        return res.status(404).json({ mensagen: "Não encontrado" })
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//Fazer o cadastro do usuario
exports.adicionarUsuario = async (req, res) => {
    try {
        let { nome, email, senha } = req.body;
        const salvo = await usuarioService.adicionarUsuario({ nome, email, senha });
        if (!salvo) {
            return res.status(409).json({ mensagen: "email já cadastrado!" })
        }
        return res.status(201).json(salvo);

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//atualizar o usuario
exports.atualizarUsuario = async (req, res) => {
    try {
        let { nome, email, tipo } = req.body;
        const atualizado = await usuarioService.atualizarUsuario({ nome, email, tipo }, req.params.id);
        if (!atualizado) {
            return res.status(404).json({ mensagen: 'Usuário não encontrado' });
        }
        return res.json(atualizado);

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//atualizar senha do usuario
exports.trocarSenha = async (req, res) => {
    try {
        const atualizado = await usuarioService.trocarSenha(req.params.id, req.body.senha);
        if (!atualizado) {
            res.status(404).json({ mensagen: 'Usuário não encontrado' });
        }
        res.json({ mensagen: "senha atualizada!" });

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}
//deletar o usuario
exports.removerUsuario = async (req, res) => {
    try {
        const deleted = await usuarioService.removerUsuario(req.params.id);
        if (deleted) {
            return res.status(200).json({ mensagen: 'Usuário excluído com sucesso' });
        }
        return res.status(404).json({ mensagen: 'Usuário não encontrado' });

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}
