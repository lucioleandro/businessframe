var ConnectionFactory = (function() {
    const stores = ['negociacoes'];
    const version = 1;
    const dbName = 'businessframe';
    
    var connection = null;
    var closeConnection = null;
    
    return class ConnectionFactory {
        
        constructor() {
            throw new Error('Não é possível criar instâncias de ConnectionFactory');
        }
        
        static getConnection() {
            return new Promise((resolve, reject) => {
                let openRequest =  window.indexedDB.open(dbName, version);
    
                openRequest.onupgradeneeded = e => {
                    ConnectionFactory._createStores(e.target.result);
                };
    
                openRequest.onsuccess = e => {
                    if(!connection) {
                        connection = e.target.result;
                        closeConnection = connection.close.bind(connection);
                        connection.close = function() {
                            throw new Error('Você não pode fechar diretamente a conexão');
                        }
                    }
                    resolve(e.target.result);
                };
    
                openRequest.onerror = e => {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                };
            });
        }
    
        static _createStores(connection) {
            stores.forEach(store => {
                if(connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }
                connection.createObjectStore(store, {autoIncrement: true});
            });
        }

        static _closeConnection() {
            if(connection) {
                connection.close();
                connection = null;
            }
        }
    }
})();
