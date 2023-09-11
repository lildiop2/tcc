import { Component,Inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import {fileOpen,
  directoryOpen,
  fileSave,
  supported } from 'browser-fs-access';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [{ provide: 'API_URL', useValue: environment.ApiUrl }]
})
export class AppComponent {
  title = 'angular-front';
  public apiUrl: string = environment.ApiUrl;
  produtos:{id:number,nome:string,desc:string,preco:number,imagem:string}[]=[];

  constructor(private window: Window) {
    // ...
}

  async createProduct(count:number) {
    // Lógica para criar 1000 registros
        const blobs = await fileOpen({
              mimeTypes: [' application/json'],
              multiple: false,
              startIn: 'documents'
            });

        const produtos=JSON.parse(await blobs.text());
        const dirHandle = <any> await directoryOpen();
          const promises = [];
          for await (const entry of dirHandle.values()) {

            if (entry?.handle?.kind !== 'file') {
              continue;
            }
            // console.log('entry :>> ', await entry);
            promises.push(await entry);
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
              // console.log('file :>> ', JSON.stringify(Array.from(new Uint8Array(await sorteds[randomNumber].arrayBuffer()))));

          }

          let fim=performance.mark("upload-produto-finished", {
            detail: "Fim de upload dos produto.",
          });

          console.log(`${count}===> create time: ${fim.startTime-inicio.startTime} milliseconds.`);
          // // const buffers =files.filter((file)=>JSON.stringify(file))
          // // console.log('buffers :>> ', await Promise.all(files));
  };
  async readProduct(count:number, event:Event) {
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
  };
  async updateProduct(count:number) {
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

      fetch(this.apiUrl+"/api/produto/"+this.produtos[i]?.id, {
                method: "PUT",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                      nome:this.produtos[i]?.nome,
                      desc:this.produtos[i]?.desc,
                      preco:this.produtos[i]?.preco,
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
 async deleteProduct(count:number) {
    // Lógica para deletar 1000 registros
    let inicio=performance.mark("remocao-produto-started", {
          detail: "Inicio de remoção dos produto.",
        });
    while (this.produtos.length>0) {
      const produto = this.produtos.shift();
     fetch(this.apiUrl+"/api/produto/"+produto?.id, {
                method: "DELETE",
              });
      // this.produtos.splice(i,1);

    }
    let fim=performance.mark("remocao-produto-finished", {
      detail: "Fim de remoção dos produto.",
    });
    // console.log('fim :>> ', fim);
    console.log(`${count}===> delete time: ${fim.startTime-inicio.startTime} milliseconds.`);
  };
}
