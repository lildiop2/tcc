const carrinhoService = require('../services/carrinhoService');

//listar carrinho
exports.listarTodosOsCarrinhos = async (req, res) => {
    try {
        return res.json(await carrinhoService.listarTodosOsCarrinhos());
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//get carrinho by id
exports.retornarCarrinhoPorId = async (req, res) => {
    try {
        const carrinho = await carrinhoService.retornarCarrinhoPorId(req.params.id);
        if (carrinho) return res.json(carrinho);
        return res.status(404).json({ mensagen: "carrinho não encontrado" })
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//Fazer o cadastro do carrinho
exports.adicionarCarrinho = async (req, res) => {
    try {
        const salvo = await carrinhoService.adicionarCarrinho();
        if (!salvo) {
            return res.status(400).json({ mensagen: "carrinho não cadastrado!" })
        }
        return res.status(201).json(salvo);

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//atualizar o carrinho
exports.atualizarCarrinho = async (req, res) => {
    try {
        
        const atualizado = await carrinhoService.atualizarCarrinho(req.params.id);
        if (!atualizado) {
            return res.status(404).json({ mensagen: 'carrinho não encontrado' });
        }
        return res.json(atualizado);

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//deletar o carrinho
exports.removerCarrinho = async (req, res) => {
    try {
        const deleted = await carrinhoService.removerCarrinho(req.params.id);
        if (deleted) {
            return res.status(200).json({ mensagen: 'carrinho excluído com sucesso' });
        }
        return res.status(404).json({ mensagen: 'carrinho não encontrado' });

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}
