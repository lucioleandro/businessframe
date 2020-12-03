import { Bind } from '../helpers/Bind'
import { ListaNegociacoes } from '../models/ListaNegociacoes';
import { Mensagem } from '../models/Mensagem';
import  { MensagemView } from '../views/MensagemView';
import  { NegociacoesView } from '../views/NegociacoesView';
import { NegociacaoService } from '../services/NegociacaoService';
import { Negociacao } from '../models/Negociacao';
import { DateHelper } from '../helpers/DateHelper';

class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoesView')),'add', 'addList', 'clear');
        
        this._mensagem = new Bind(new Mensagem, new MensagemView($('#mensagem')), 'texto');

        this._service = new NegociacaoService();

        this._onInit();
    }
    
    _onInit() {
        this._getAllBusiness();
        this._importBusiness();
        setInterval(() => {
            this._importBusiness();
        }, 60000)
    }

    create(event) {
        event.preventDefault();
        let negociacao = this._createBusiness();

        this._service.create(negociacao)
            .then(message => {
                this._mensagem.texto = message;
                this._listaNegociacoes.add(negociacao);
            })
            .catch(error => {
                console.log(error);
                this._mensagem.texto = error;
            });
    }

    deleteList() {
        if(!this._listaNegociacoes.negociacoes.length) {
            return;
        }

        this._service.removeAll()
            .then(message => {
                this._listaNegociacoes.clear();
                this._mensagem.texto = message;
            })
            .catch(error => this._mensagem.texto = error);
    }

    _importBusiness() {
        this._service.importa(this._listaNegociacoes.negociacoes)
            .then(negociacoes => {
                this._listaNegociacoes.addList(negociacoes)
            })
            .catch(error => this._mensagem.texto = error);
    }

    _createBusiness() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
          );
    }

    _getAllBusiness() {
        this._service.findAll()
            .then(negociacoes => this._listaNegociacoes.addList(negociacoes))
            .catch(error => this._mensagem.texto = error);
    }

    _clearForm() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}

let negociacaoController = new NegociacaoController();
export function currentInstance() {
    return negociacaoController;
}