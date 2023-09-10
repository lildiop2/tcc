const pedidoService = require('../services/pedidoService');

//listar pedido
exports.listarTodosOsPedidos = async (req, res) => {
    try {
        return res.json(await pedidoService.listarTodosOsPedidos());
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//get pedido by id
exports.retornarPedidoPorId = async (req, res) => {
    try {
        const pedido = await pedidoService.retornarPedidoPorId(req.params.id);
        if (pedido) return res.json(pedido);
        return res.status(404).json({ mensagen: "pedido não encontrado" })
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//Fazer o cadastro do pedido
exports.adicionarPedido = async (req, res) => {
    try {
        let { data } = req.body;
        const salvo = await pedidoService.adicionarPedido(data);
        if (!salvo) {
            return res.status(400).json({ mensagen: "pedido não cadastrado!" })
        }
        return res.status(201).json(salvo);

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//atualizar o pedido
exports.atualizarPedido = async (req, res) => {
    try {
        let { data } = req.body;
        const atualizado = await pedidoService.atualizarPedido(data, req.params.id);
        if (!atualizado) {
            return res.status(404).json({ mensagen: 'pedido não encontrado' });
        }
        return res.json(atualizado);

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//deletar o pedido
exports.removerPedido = async (req, res) => {
    try {
        const deleted = await pedidoService.removerPedido(req.params.id);
        if (deleted) {
            return res.status(200).json({ mensagen: 'pedido excluído com sucesso' });
        }
        return res.status(404).json({ mensagen: 'pedido não encontrado' });

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}
