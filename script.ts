

//pegamos o body que está dentro de document
// const {body} = document;

//para indicar o tipo de dado a ser alocado
const {body}: {body: HTMLElement } = document;

interface Produto {
    nome: string;
    preco: number;
}

function handleData( {nome, preco}: Produto ) {

    //com a desestruturação feita, podemos utilizar os métodos
    nome.includes('book');
    preco.toFixed();
}

handleData({
    nome: "Notebook",
    preco: 1500
});