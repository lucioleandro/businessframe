class ListaNegociacoes {

    constructor() {
        this._negociacoes = [];
    }

    add(negociacao) {
        this._negociacoes.push(negociacao);
    }

    addList(negociacoes) {
        this._negociacoes = [].concat(this._negociacoes, negociacoes);
    }

    clear() {
        this._negociacoes = [];
    }

    get negociacoes() {
        return [].concat(this._negociacoes);
    }
}