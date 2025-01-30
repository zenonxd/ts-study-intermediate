// 1 - Crie uma interface UserData para o formulário abaixo
// 2 - Crie uma variável global UserData no window, ela será um objeto qualquer
// 3 - Adicione um evento de keyup ao formulário
// 4 - Quando o evento ocorrer adicione a {[id]: value} ao UserData
// 5 - Salve UserData no localStorage
// 6 - Crie uma User Type Guard, para verificar se o valor de localStorage é compatível com UserData
// 7 - Ao refresh da página, preencha os valores de localStorage (caso seja UserData) no formulário e em window.UserData

interface UserData {
    nome: string;
    email: string;
    cpf: string;
}

interface Window {
    UserData: {};
}

window.UserData = UserData;

const form = document.getElementById('form');


function handleKeyUp({target}: KeyboardEvent) {






}

form?.addEventListener('keyup', handleKeyUp);