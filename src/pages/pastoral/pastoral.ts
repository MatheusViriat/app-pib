import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
    templateUrl: 'pastoral.html'
})
export class Pastoral implements OnInit{

    public page;
    public conteudo;
    public titulo;
    public resumo;
    public imagem;
    
    constructor(
    public navCtrl: NavController, 
    private _http: Http, 
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController) {}

    //ciclo de vida inicial
    ngOnInit(){

        let loader = this._loadingCtrl.create({
            content: 'Carregando. Aguarde...'
        });

        loader.present(); //para exibir o loader

        this._http
            .get('http://pibsaomiguel.com.br/wp-json/wp/v2/pages/792')
            .map(res => res.json())
            .toPromise()
            .then(pages => {
            this.page = pages;
            loader.dismiss(); // para fechar o loader
            console.log(pages);
            this.conteudo = pages.content.rendered;
            this.resumo = pages.excerpt.rendered;
            this.titulo = pages.title.rendered;
            this.imagem = pages.better_featured_image.source_url;
            })
            .catch(
            err => {
                console.log(err);
                loader.dismiss();
                this._alertCtrl
                .create({
                    title: 'Falha na conexão',
                    buttons: [{ text: 'Estou ciente' }],
                    subTitle: 'Não foi possível obter a página. Tente mais tarde.'
                }).present();
            });
    }
}