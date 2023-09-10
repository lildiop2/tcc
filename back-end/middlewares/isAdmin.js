module.exports = (req, res, next) => {
    try {
        let { tipo } = req.user;
        if (tipo==='admin') {
            next();
        } else return res.status(401).json({mensagem:"Não autorizado!"})
    } catch (error) {
        return res.status(401).json({mensagem:"Não autorizado!"})
    }
}