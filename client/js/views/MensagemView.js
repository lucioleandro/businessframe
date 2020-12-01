class MensagemView extends View {

    constructor(elemento) {
        super(elemento);
    }

    template(model) {
        if(model.texto === '') return ``
        return `
            <p class="alert alert-info">${model.texto}</p>
        `;
    }
}