<template>
    <main>
        <div class="container">
        <div class="row justify-content-center mt-2" >
        <button  type="button" class="btn btn-primary mx-2 px-4" @click="createProduct(1000)">Create 1000</button>
        <button  type="button" class="btn btn-secondary mx-2 px-4" @click="readProduct(1000, $event)">Read 1000</button>
        <button  type="button" class="btn btn-info mx-2 px-4" @click="updateProduct(1000)">Update 1000</button>
        <button  type="button" class="btn btn-danger mx-2 px-4" @click="deleteProduct(1000)">Delete 1000</button>
      </div>
      <div class="row justify-content-center mt-2" >
        <button  type="button" class="btn btn-primary mx-2 px-4" @click="createProduct(5000)">Create 5000</button>
        <button  type="button" class="btn btn-secondary mx-2 px-4" @click="readProduct(5000, $event)">Read 5000</button>
        <button  type="button" class="btn btn-info mx-2 px-4" @click="updateProduct(5000)">Update 5000</button>
        <button  type="button" class="btn btn-danger mx-2 px-4" @click="deleteProduct(5000)">Delete 5000</button>
      </div>
      <div class="row justify-content-center mt-2" >
        <button  type="button" class="btn btn-primary mx-1 px-4" @click="createProduct(10000)">Create 10000</button>
        <button  type="button" class="btn btn-secondary mx-1 px-4" @click="readProduct(10000, $event)">Read 10000</button>
        <button  type="button" class="btn btn-info mx-1 px-4" @click="updateProduct(10000)">Update 10000</button>
        <button  type="button" class="btn btn-danger mx-1 px-4" @click="deleteProduct(10000)">Delete 10000</button>
      </div>
      </div>
      <hr class="py-1  bg-dark">
      <div class="container" >
        <h1 v-if="produtos.length !== 0" class="row justify-content-center">Lista de produtos E-commerce</h1>
        <div class="d-flex flex-wrap">
          <div v-for="produto in produtos" :key="produto.id" class="col-3 mb-2">
              <Produto :nome="produto.nome" :descricao="produto.desc" :preco="produto.preco" :url="produto.imagem" ></Produto>
        </div>

        </div>
    
      </div>
      </main>
</template>

<script>
import Produto from '../components/Produto.vue';
import {
  fileOpen,
  directoryOpen,
  fileSave,
  supported,
} from '../../node_modules/browser-fs-access';
export default {
  components: {
    Produto
  },
  data() {
    return { 
      produtos: [],
      t0:0,
      t1:0,
      caregado:{},
      apiUrl:`${import.meta.env.VITE_API_URL}`
    }
  },
  methods: {
    async createProduct(count) {
      // Lógica para criar 1000 registros
          const blobs = await fileOpen({
                mimeTypes: [' application/json'],
                multiple: false,
                startIn: 'documents'
              });

          const produtos=JSON.parse(await blobs.text());
          const dirHandle = await window.showDirectoryPicker();
            const promises = [];
            for await (const entry of dirHandle.values()) {
              if (entry.kind !== 'file') {
                continue;
              }
              promises.push(entry.getFile());
            }
            const files=await Promise.all(promises);
            const sorteds=files.sort((a,b)=>{
              const nomeA=Number(a?.name?.slice(0,a?.name?.length-4));
              const nomeB=Number(b?.name?.slice(0,b?.name?.length-4));
              return nomeA-nomeB;
            })
            let inicio=performance.mark("upload-produto-started", {
                  detail: "Inicio de upload dos produto.",
                });
            for (let i = 0; i < count; i++){
              //escolha um produto aleatorio para cadastrar
              let randomNumber=Math.floor(Math.random() * (1499 - 0 + 1)) + 0;
                fetch(this.apiUrl+"/api/produto", {
                  method: "POST",
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                        nome:produtos[randomNumber].nome,
                        desc:produtos[randomNumber].desc,
                        preco:produtos[randomNumber].preco,
                        imagem: JSON.stringify(Array.from(new Uint8Array(await sorteds[randomNumber].arrayBuffer())))
                        }),
                });
                // console.log('file :>> ', file);
              
            }
            
            let fim=performance.mark("upload-produto-finished", {
              detail: "Fim de upload dos produto.",
            });
            
            console.log(`${count}===> create time: ${fim.startTime-inicio.startTime} milliseconds.`);
            // const buffers =files.filter((file)=>JSON.stringify(file))
            // console.log('buffers :>> ', await Promise.all(files));
    },
    async readProduct(count, event) {
      let inicio=performance.mark("carregamento-produto-started", {
        detail: "Inicio de busca dos produto.",
        startTime: event.timeStamp,
      });
      // this.t0=event.timeStamp;
      // console.log('inicio :>> ', inicio);
      // Lógica para ler 1000 registros
      const response = await fetch(this.apiUrl+"/api/produtos/?quantidade="+count,{
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },

      });
      this.produtos= await response.json();
      let fim=performance.mark("carregamento-produto-finished", {
        detail: "Fim de busca dos produto.",
      });
      // console.log('fim :>> ', fim);
      console.log(`${count}===> read time: ${fim.startTime-inicio.startTime} milliseconds.`);
    },
    async updateProduct(count) {
      // Lógica para atualizar 1000 registros
      let inicio=performance.mark("ataualizacao-produto-started", {
            detail: "Inicio de ataulização dos produto.",
          });
      for (let i = 0; i < count; i++) {
          // console.log('link :>> ', this.produtos[i].imagem);
        const img = await fetch(this.produtos[i].imagem,{
                        method: "GET", // *GET, POST, PUT, DELETE, etc.
                       });

          const blob = await img.blob();
          
        fetch(this.apiUrl+"/api/produto/"+this.produtos[i].id, {
                  method: "PUT",
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                        nome:this.produtos[i].nome,
                        desc:this.produtos[i].desc,
                        preco:this.produtos[i].preco,
                        imagem: JSON.stringify(Array.from(new Uint8Array(await blob.arrayBuffer())))
                        }),
                });

      }
      let fim=performance.mark("ataualizacao-produto-finished", {
        detail: "Fim de ataulização dos produto.",
      });
      // console.log('fim :>> ', fim);
      console.log(`${count}===> update time: ${fim.startTime-inicio.startTime} milliseconds.`);

    },
   async deleteProduct(count) {
      // Lógica para deletar 1000 registros
      let inicio=performance.mark("remocao-produto-started", {
            detail: "Inicio de remoção dos produto.",
          });
      while (this.produtos.length>0) {
        const produto = this.produtos.shift();
       fetch(this.apiUrl+"/api/produto/"+produto.id, {
                  method: "DELETE",
                });
        // this.produtos.splice(i,1);

      }
      let fim=performance.mark("remocao-produto-finished", {
        detail: "Fim de remoção dos produto.",
      });
      // console.log('fim :>> ', fim);
      console.log(`${count}===> delete time: ${fim.startTime-inicio.startTime} milliseconds.`);
    },

    carregar(event){
      this.t1=event.timeStamp;
      console.log(`tempo:${this.t1-this.t0}`);
    }
  }
  
}
</script>
