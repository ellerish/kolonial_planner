import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserProvider} from "../../providers/user/user";
import {HomePage} from "../home/home";

/**
 * Generated class for the FriendListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
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
              private userProvider : UserProvider) {
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

  manage(val : any) : void
  {
    console.dir(val);
  }

  ionViewDidLoad() {
    this.owner = this.userProvider.getUser();
    console.log('ionViewDidLoad FriendListPage');
  }

  goToMakeList(){
    this.navCtrl.push('FriendListPage')
  }

  goToHome(){
    this.navCtrl.push(HomePage);
  }

  goToBasket(){
    this.navCtrl.push('BasketPage');
  }

  goToProfil(){
    this.navCtrl.push('ProfilPage');
  }
}
