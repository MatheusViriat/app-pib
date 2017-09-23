import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  public posts;
  
  constructor(
    public navCtrl: NavController, 
    private _http: Http, 
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController) {}

  //ciclo de vida inicial
  ngOnInit(){
    let loader = this._loadingCtrl.create({
      content: 'Buscando novos avisos. Aguarde...'
    });

    loader.present(); //para exibir o loader

    this._http
      .get('http://pibsaomiguel.com.br/wp-json/wp/v2/posts/?page=1')
      .map(res => res.json())
      .toPromise()
      .then(posts => {
        this.posts = posts;
        loader.dismiss(); // para fechar o loader
        // console.log(posts);
      })
      .catch(
        err => {
          console.log(err);
          loader.dismiss();
          this._alertCtrl
            .create({
              title: 'Falha na conexão',
              buttons: [{ text: 'Estou ciente' }],
              subTitle: 'Não foi possível obter a lista de avisos. Tente mais tarde.'
            }).present();
      });
  }

}
