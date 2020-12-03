export class Negociacao {

    constructor(data, quantidade, valor) {
        this._data = new Date(data.getTime());
        this._quantidade = quantidade;
        this._valor = valor;
        Object.freeze(this);
    }

    obtemVolume() {
        return this._valor * this._quantidade;
    }

    get data() {
        return new Date(this._data.getTime());
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }

    isEqual(outraNegociacao) {
        return JSON.stringify(this) == JSON.stringify(outraNegociacao);
    }
}