const Produto=({id,nome,desc,preco,imagem })=>{

    return(
        <>
        <div className="card">
        <img src={imagem} className="card-img-top img-fluid" alt="Imagem do Produto" />
        <div className="card-body">
          <h5 className="card-title">{nome}</h5>
          <p className="card-text">{desc}</p>
          <p className="card-text">Preço: R$ {preco}</p>
          <a href="#" className="btn btn-primary">Comprar</a>
        </div>
      </div>
      </>

    )
}

export default Produto;