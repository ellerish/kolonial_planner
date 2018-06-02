import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Items} from "../../models/Items";
import {Varer} from "../../models/Varer";
import {Item} from "ionic-angular";
import {CartItem} from "../../models/cart-item";
import {Product} from "../../models/product";

//
// const CART_KEY = 'cartItems';

export const CART_ITEM_LIST:CartItem[]=[];

@Injectable()
export class CartServiceProvider {
  cartItems: Items[];
  cartCount: number;


  constructor() {
    this.cartCount = 0;
  }

  addToCart(product: Items){
    var addedItem = CART_ITEM_LIST.find(
      t => t.product == product
    );
    if (addedItem){
      addedItem.quantity++;
    } else {
      let cartItem = new CartItem();
      cartItem.product = product;
      cartItem.quantity = 1;
      CART_ITEM_LIST.push(cartItem);
    }
  }

  removeFromCart(product: Items) {
    var addedItem = CART_ITEM_LIST.find(
      t => t.product == product
    );
    var indexNo = CART_ITEM_LIST.indexOf(addedItem);

    if (indexNo != -1) {
      CART_ITEM_LIST.splice(indexNo, 1);
    }
  }

  list(): CartItem[] {
    return CART_ITEM_LIST;
  }

  clear() {
    CART_ITEM_LIST.splice(0, CART_ITEM_LIST.length);
  }


}
