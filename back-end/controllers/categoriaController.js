const categoriaService = require('../services/categoriaService');

//listar categoria
exports.listarTodosOsCategorias = async (req, res) => {
    try {
        return res.json(await categoriaService.listarTodosOsCategorias());
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//get categoria by id
exports.retornarCategoriaPorId = async (req, res) => {
    try {
        const categoria = await categoriaService.retornarCategoriaPorId(req.params.id);
        if (categoria) return res.json(categoria);
        return res.status(404).json({ mensagen: "categotia não encontrado" })
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//Fazer o cadastro do categoria
exports.adicionarCategoria = async (req, res) => {
    try {
        let { nome} = req.body;
        const salvo = await categoriaService.adicionarCategoria(nome);
        if (!salvo) {
            return res.status(400).json({ mensagen: "categoria não cadastrado!" })
        }
        return res.status(201).json(salvo);

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//atualizar o categoria
exports.atualizarCategoria = async (req, res) => {
    try {
        let { nome } = req.body;
        const atualizado = await categoriaService.atualizarCategoria(nome, req.params.id);
        if (!atualizado) {
            return res.status(404).json({ mensagen: 'categoria não encontrado' });
        }
        return res.json(atualizado);

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}


//deletar o categoria
exports.removerCategoria = async (req, res) => {
    try {
        const deleted = await categoriaService.removerCategoria(req.params.id);
        if (deleted) {
            return res.status(200).json({ mensagen: 'categoria excluído com sucesso' });
        }
        return res.status(404).json({ mensagen: 'categoria não encontrado' });

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}
