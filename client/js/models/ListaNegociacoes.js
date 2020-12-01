class ListaNegociacoes {

    constructor() {
        this._negociacoes = [];
    }

    add(negociacao) {
        this._negociacoes.push(negociacao);
    }

    clear() {
        this._negociacoes = [];
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }
}