import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent {
  @Input() produto!: {id:number,nome:string,desc:string,preco:number,imagem:string};

}
