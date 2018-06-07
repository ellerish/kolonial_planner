import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Items} from "../../models/Items";
import {AngularFirestore, AngularFirestoreCollection} from "angularfire2/firestore";
import {Observable} from "rxjs/Observable";
import {Varer} from "../../models/Varer";
import {HomePage} from "../home/home";
import {CartServiceProvider} from "../../providers/cart-service/cart-service";
import * as firebase from "firebase";
import {ProfilPage} from "../profil/profil";



/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  public vare: Varer;
  public vareCollection: AngularFirestoreCollection<Varer>;
  public details: Observable<any[]>;

  selectedProduct: Items;
  cartCount: number = 0;

  nameBasket: string;

  public vareRef:firebase.database.Reference;
  public loadedVareList:Array<any>;
  public vareList:Array<any>;


  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFirestore, private cartService: CartServiceProvider) {
    this.vare = navParams.get('vare');
    this.vareCollection = navParams.get('vareCollection');

    this.nameBasket = navParams.get('data');

    this.vareRef = firebase.database().ref('/details');
    this.vareRef.on('value', vareList => {
      let varer = [];
      vareList.forEach(vare => {
        varer.push(vare.val());
        return false;
      });
      this.vareList = varer;
      this.loadedVareList = varer;
    });


    this.details = this.vareCollection.doc(this.vare.id).collection("details").valueChanges();

  this.selectedProduct = navParams.get('details');

 // this.cartCount = this.navParams.get('cartCount')


  }

  initItems(): void{
    this.vareList = this.loadedVareList;
  }

  getItems(searchbar){
    this.initItems();
    var query = searchbar.srcElement.value;
    if(!query){
      return;
    }
    this.vareList = this.vareList.filter((v) => {
      if(v.name && query) {
        if(v.name.toLowerCase().indexOf(query.toLowerCase()) > -1){
          return true;
        }
        return false;
      }
    })

  }

  itemTapped($event,product){
    this.navCtrl.push('ProfilPage', {
      details: product
    });
  }



  addToCart(product: Items){
    this.cartService.addToCart(product);
    this.cartService.cartCount=this.cartService.cartCount+1;
    this.cartCount = this.cartService.cartCount;
  }

  removeFromCart(product: Items){
    this.cartService.removeFromCart(product);
    if(this.cartCount != 0) {
      this.cartService.cartCount = this.cartService.cartCount - 1;
      this.cartCount = this.cartService.cartCount;
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }


  logout(){
    this.af.app.auth().signOut();
  }


  goToMakeList(){
    this.navCtrl.push('FriendListPage')
  }

  goToHome(){
    this.navCtrl.push(HomePage);
  }

  goToBasket(nameBasket){
    this.navCtrl.push('BasketPage', {
      data: nameBasket
    });
  }

  goToProfil(nameBasket){
    this.navCtrl.push('ProfilPage', {
      data: nameBasket
    });

  }
}
