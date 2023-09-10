import { useState } from 'react'
import Produto from './Produto.jsx'
import {fileOpen } from 'browser-fs-access';

function App() {
  const [produtos, setProdutos] = useState([])

  const createProduct=async (count)=> {
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
              fetch("http://localhost:8080/api/produto", {
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
  };
  const  readProduct= async (count, event) =>{
    let inicio=performance.mark("carregamento-produto-started", {
      detail: "Inicio de busca dos produto.",
      startTime: event.timeStamp,
    });
    // this.t0=event.timeStamp;
    // console.log('inicio :>> ', inicio);
    // Lógica para ler 1000 registros
    const response = await fetch("http://localhost:8080/api/produtos/?quantidade="+count,{
      method: "GET", // *GET, POST, PUT, DELETE, etc.
      headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
  },

    });
    setProdutos(await response.json());
    let fim=performance.mark("carregamento-produto-finished", {
      detail: "Fim de busca dos produto.",
    });
    // console.log('fim :>> ', fim);
    console.log(`${count}===> read time: ${fim.startTime-inicio.startTime} milliseconds.`);
  };
 const updateProduct= async (count)=> {
    // Lógica para atualizar 1000 registros
    let inicio=performance.mark("ataualizacao-produto-started", {
          detail: "Inicio de ataulização dos produto.",
        });
    for (let i = 0; i < count; i++) {
        // console.log('link :>> ', produtos[i].imagem);
      const img = await fetch(produtos[i].imagem,{
                      method: "GET", // *GET, POST, PUT, DELETE, etc.
                     });

        const blob = await img.blob();
        
      fetch("http://localhost:8080/api/produto/"+produtos[i].id, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                      nome:produtos[i].nome,
                      desc:produtos[i].desc,
                      preco:produtos[i].preco,
                      imagem: JSON.stringify(Array.from(new Uint8Array(await blob.arrayBuffer())))
                      }),
              });

    }
    let fim=performance.mark("ataualizacao-produto-finished", {
      detail: "Fim de ataulização dos produto.",
    });
    // console.log('fim :>> ', fim);
    console.log(`${count}===> update time: ${fim.startTime-inicio.startTime} milliseconds.`);

  };
 const deleteProduct=(count)=> {
    // Lógica para deletar 1000 registros
    let inicio=performance.mark("remocao-produto-started", {
          detail: "Inicio de remoção dos produto.",
        });
        let newProdutos=[...produtos];
    while (newProdutos.length>0) {
      const produto = newProdutos.shift();
      setProdutos(newProdutos);
     fetch("http://localhost:8080/api/produto/"+produto.id, {
                method: "DELETE",
              });
      // produtos.splice(i,1);

    }
    let fim=performance.mark("remocao-produto-finished", {
      detail: "Fim de remoção dos produto.",
    });
    // console.log('fim :>> ', fim);
    console.log(`${count}===> delete time: ${fim.startTime-inicio.startTime} milliseconds.`);
  };

  return (
    <>
      <main>
        <div className="container">
        <div className="row justify-content-center mt-2" >
        <button  type="button" className="btn btn-primary mx-2 px-4" onClick={()=>createProduct(1000)}>Create 1000</button>
        <button  type="button" className="btn btn-secondary mx-2 px-4" onClick={(event) =>readProduct(1000, event)}>Read 1000</button>
        <button  type="button" className="btn btn-info mx-2 px-4" onClick={()=>updateProduct(1000)}>Update 1000</button>
        <button  type="button" className="btn btn-danger mx-2 px-4" onClick={()=>deleteProduct(1000)}>Delete 1000</button>
      </div>
      <div className="row justify-content-center mt-2" >
        <button  type="button" className="btn btn-primary mx-2 px-4" onClick={()=>createProduct(5000)}>Create 5000</button>
        <button  type="button" className="btn btn-secondary mx-2 px-4" onClick={(event) =>readProduct(5000, event)}>Read 5000</button>
        <button  type="button" className="btn btn-info mx-2 px-4" onClick={()=>updateProduct(5000)}>Update 5000</button>
        <button  type="button" className="btn btn-danger mx-2 px-4" onClick={()=>deleteProduct(4000)}>Delete 5000</button>
      </div>
      <div className="row justify-content-center mt-2" >
        <button  type="button" className="btn btn-primary mx-1 px-4" onClick={()=>createProduct(10000)}>Create 10000</button>
        <button  type="button" className="btn btn-secondary mx-1 px-4" onClick={(event) =>readProduct(10000, event)}>Read 10000</button>
        <button  type="button" className="btn btn-info mx-1 px-4" onClick={()=>updateProduct(10000)}>Update 10000</button>
        <button  type="button" className="btn btn-danger mx-1 px-4" onClick={()=>deleteProduct(10000)}>Delete 10000</button>
      </div>
      </div>
      <hr className="py-1  bg-dark"/>
      <div className="container" >
        {
          produtos.length!==0 &&  <h1 className="row justify-content-center">Lista de produtos E-commerce</h1>
        }
       
        <div className="d-flex flex-wrap">
       { produtos.map((produto,i)=>{
          return(
            <div key={i} className="col-3 mb-2">
            <Produto nome={produto.nome} desc={produto.desc} preco={produto.preco} imagem={produto.imagem} />
            </div>
          );
        })}

        </div>
    
      </div>
      </main>
    </>
  )
}

export default App
