const produtoService = require('../services/produtoService');

//listar produto
exports.listarTodosOsProdutos = async (req, res) => {
    try {
        let {quantidade}= req.query;
        if(quantidade) return res.json(await produtoService.listarProdutosPorQuantidade(Number(quantidade)));
        return res.json(await produtoService.listarTodosOsProdutos());
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}


//get produto by id
exports.retornarProdutoPorId = async (req, res) => {
    try {
        const produto = await produtoService.retornarProdutoPorId(req.params.id);
        if (produto) return res.json(produto);
        return res.status(404).json({ mensagen: "produto não encontrado" })
    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//Fazer o cadastro do produto
exports.adicionarProduto = async (req, res) => {
    try {
        let { nome, desc, preco, imagem} = req.body;
        const salvo = await produtoService.adicionarProduto({ nome, desc, preco,imagem });
        if (!salvo) {
            return res.status(400).json({ mensagen: "produto não cadastrado!" })
        }
        return res.status(201).json(salvo);

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//atualizar o produto
exports.atualizarProduto = async (req, res) => {
    try {
        let { nome, desc, preco,imagem } = req.body;
        const atualizado = await produtoService.atualizarProduto({ nome, desc, preco, imagem }, req.params.id);
        if (!atualizado) {
            return res.status(404).json({ mensagen: 'produto não encontrado' });
        }
        return res.json(atualizado);

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}

//deletar o produto
exports.removerProduto = async (req, res) => {
    try {
        const deleted = await produtoService.removerProduto(req.params.id);
        if (deleted) {
            return res.status(200).json({ mensagen: 'produto excluído com sucesso' });
        }
        return res.status(404).json({ mensagen: 'produto não encontrado' });

    } catch (error) {
        console.log('error :>> ', error);
        return res.status(500).json(error)
    }
}
