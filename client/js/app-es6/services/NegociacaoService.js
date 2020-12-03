import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import { NegociacaoDao } from '../dao/NegociacaoDao';
import { Negociacao } from '../models/Negociacao';

export class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    create(negociacao) {
        return ConnectionFactory.getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.save(negociacao))
            .then(() => 'Negociação adicionada com sucesso')
            .catch(() => { throw new Error('Não foi possível adicionar a negociação') });
    }

    findAll() {
        return ConnectionFactory.getConnection()
            .then(connection => 
                new NegociacaoDao(connection).findAll()
                    .then(negociacoes => negociacoes))
                    .catch(error => {
                        console.log(error);
                        return 'Não foi possível obter as negociações';
                    });
    }

    removeAll() {
        return ConnectionFactory.getConnection()
                .then(connection => new NegociacaoDao(connection))
                .then(dao => dao.deleteAll())
                .then(() => 'Negociaçoes apagadas com sucesso!')
                .catch(error => {
                    console.log(error);
                    throw new Error('Não foi possível apagar as negociações');
                });
    }

    importa(currentList) {
        return this._obterNegociacoes()
            .then(negociacoes => negociacoes.filter(negociacao =>
                    !currentList.some(negociacaoExistente =>
                         JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))
                         ).catch(error => {
                console.log(error);
                throw new Error('Não foi possível importar as negociações');
            });
    }

    _obterNegociacoes() {
        return new Promise((resolve, reject) => {
            this._http.get('negociacoes/semana')
            .then(negociacoes => {
                resolve(negociacoes.map(obj => 
                    new Negociacao(new Date(obj.data), obj.quantidade, obj.valor)));
            }).catch(error => {
                console.log('Não foi possível obter as negociações da semana');
                reject(error);
            });
        });
    }
}