class NegociacaoDao {

    constructor(connection) {
        this._connection = connection;
        this._store = 'negociacoes';
    }

    save(negociacao) {
        return new Promise((resolve, reject) => {
            let request = this._connection.transaction([this._store], 'readwrite')
            .objectStore(this._store)
            .add(negociacao);

            request.onsuccess = e => {
                resolve();
            };

            request.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível salvar a negociação');
            }
        });
    }

    findAll() {
        return new Promise((resolve, reject) => {
            let negociacoes = [];
            let cursor = this._connection.transaction([this._store], 'readwrite')
            .objectStore(this._store)
            .openCursor();

            cursor.onsuccess = e => {
                let current = e.target.result;
                if(current) {
                    let data = current.value;
                    negociacoes.push(new Negociacao(data._data, data._quantidade, data._valor));

                    current.continue();
                } else {
                    resolve(negociacoes);
                }
            };

            cursor.onerror = e => {
                console.log(e.target.error);
                reject('Não foi possível salvar a negociação');
            }
        });
    }
}