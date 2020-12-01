class NegociacaoService {

    constructor() {
        this._http = new HttpService();
    }

    obterNegociacoes() {
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