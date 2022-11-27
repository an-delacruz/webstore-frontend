import { Component } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  /*arreglo de productos*/
  productos = [
    {id:1, name:'12345', description:'Playera adidas', price:10.55, stock:256, img_url:'http://res.cloudinary.com/dvr13fnbr/image/upload/v1669175986/b7gxfj71yedcizmvou28.webp'},
    {id:2, name:'123456', description:'Playera nike', price:15.00, stock:100, img_url:'http://res.cloudinary.com/dvr13fnbr/image/upload/v1669175986/b7gxfj71yedcizmvou28.webp'},
    {id:3, name:'123457', description:'Playera puma', price:20.65, stock:175, img_url:'http://res.cloudinary.com/dvr13fnbr/image/upload/v1669175986/b7gxfj71yedcizmvou28.webp'},
  ]
  constructor(){

  }

  ngOnInit() {
    //form load
  }
  
}

