<template>
    <div class="card">
      <img :src="url" class="card-img-top img-fluid" alt="Imagem do Produto" >
      <div class="card-body">
        <h5 class="card-title">{{nome}}</h5>
        <p class="card-text">{{descricao}}</p>
        <p class="card-text">Preço: R$ {{preco}}</p>
        <a href="#" class="btn btn-primary">Comprar</a>
      </div>
    </div>
</template>

<script>
export default {
    props:{
    nome: String,
    url:String,
    descricao: String,
    preco : Number 
        
    },
  setup(props) {
    // setup() receives props as the first argument.
    // console.log(props)
  }

}
</script>

<style>

</style>