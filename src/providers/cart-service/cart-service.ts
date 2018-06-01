import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Items} from "../../models/Items";
import {Varer} from "../../models/Varer";
import {Item} from "ionic-angular";
import {CartItem} from "../../models/cart-item";

//
// const CART_KEY = 'cartItems';

export const CART_ITEM_LIST:Varer[]=[];

@Injectable()
export class CartServiceProvider {
  cartItems: Items[];
  cartCount: number;





  constructor() {
    this.cartCount = 0;
  }

  addToCart(vare: Varer){
    var addedItem = CART_ITEM_LIST.find(
      t => t.id == vare.id
    );
    if (addedItem){
      let cartItem = new CartItem();
     // cartItem.product
    }


  }

}
