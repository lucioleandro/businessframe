class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        let self = this;
        this._inputData = $('#data');
        this._inputQuantidade = $('#quantidade');
        this._inputValor = $('#valor');

        this._listaNegociacoes = new Bind(new ListaNegociacoes(), 
            new NegociacoesView($('#negociacoesView')),'add', 'clearList');
        
        this._mensagem = new Bind(new Mensagem, new MensagemView($('#mensagem')), 'texto');
    }

    create(event) {
        event.preventDefault();
        ConnectionFactory.getConnection()
            .then(connection => {
                let negociacao = this._createBusiness()
                new NegociacaoDao(connection)
                    .save(negociacao)
                    .then(() => {
                        this._listaNegociacoes.add(negociacao);
                        this._mensagem.texto = 'Negociação adicionada com sucesso';
                        this._clearForm();
                    });
            }).catch(error => this._mensagem = error);



        //Coding before IndexedDB integration
        /* event.preventDefault();
        // this._listaNegociacoes.add(this._createBusiness());

        // this._mensagem.texto = 'Negociação adicionada com sucesso';
           this._clearForm();*/
    }

    clearList() {
        this._listaNegociacoes.clear();
        this._mensagem.texto = 'Lista apagada com sucesso';
    }

    importBusiness() {
        let service = new NegociacaoService();

        service.obterNegociacoes()
            .then(negociacoes => negociacoes.forEach(negociacao => {
                this._listaNegociacoes.add(negociacao);
                this._mensagem.texto = 'Negociações da semana importada com sucesso';
            })).catch(error => this.mensagem.texto = error);
        
        // FIRST WAY
        /* service.obterNegociacaoDaSemana((err, negociacoes) => {
            if(err) {
                this._mensagem.texto = err;
                return;
            }
            negociacoes.forEach(negociacao => this._listaNegociacoes.add(negociacao));
            this._mensagem.texto = 'Negociações importadas com sucesso';
        }); */
    }

    _createBusiness() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
          );
    }

    _clearForm() {
        this._inputData.value = '';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0.0;

        this._inputData.focus();
    }
}