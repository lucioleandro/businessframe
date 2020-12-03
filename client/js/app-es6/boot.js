
import {currentInstance} from './controllers/NegociacaoController';
import {} from './polyfill/fetch';

let negociacaoController = currentInstance();

document.querySelector('.form').onsubmit = negociacaoController.create.bind(negociacaoController);
document.querySelector('[type=button]').onclick = negociacaoController.deleteList.bind(negociacaoController);