import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserProvider} from "../../providers/user/user";
import {HomePage} from "../home/home";
import {BasketPage} from "../basket/basket";
import {CartServiceProvider} from "../../providers/cart-service/cart-service";

/**
 *FriendListPage page.
 *
 * Klasse for å legge til venner/medlemmer inn på handelisten og
 * navngi handlelisten via form-control, og er dynamisk
 */

@IonicPage()
@Component({
  selector: 'page-friend-list',
  templateUrl: 'friend-list.html',
})
export class FriendListPage {

  public form: FormGroup;
  public owner: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder : FormBuilder,
              private userProvider : UserProvider, private cartService: CartServiceProvider) {
    this.navCtrl = navCtrl;


    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      friends : this.formBuilder.array([this.initFriends()])
    });
  }

  initFriends(): FormGroup {
    return this.formBuilder.group({
      name : ['', Validators.required]
    });
  }

  addNewInputField() : void{
    const control = <FormArray>this.form.controls.friends;
    control.push(this.initFriends());
  }

  removeInputField(i : number) : void{
    const control = <FormArray>this.form.controls.friends;
    control.removeAt(i);
  }



  ionViewDidLoad() {
    this.owner = this.userProvider.getUser();
    console.log('ionViewDidLoad FriendListPage');
  }


  goToBasketList(nameBasket) {
    this.navCtrl.push('BasketPage', {
      data: nameBasket
    });
  }

  goToMakeList(){
    this.navCtrl.push('FriendListPage')
  }

  goToHome(){
    this.navCtrl.push(HomePage);
  }

  goToBasket(namebasket){
    this.navCtrl.push('BasketPage', {
      data: namebasket
    });
  }

  goToProfil(nameBasket) {
    this.navCtrl.push('ProfilPage', {
      data: nameBasket
    });
  }

}
