// Crie uma função que arredonda um valor passado para cima.
// A função pode receber string ou number.
// A função deve retornar o mesmo tipo que ela receber.

function fixValue(valor: number): number;
function fixValue(valor: string): string;

function fixValue(valor: number | string): number | string {
    if (typeof valor == 'string') {
        return Number(valor).toFixed();
    } else {
        return Math.ceil(valor);
    }

}

console.log(fixValue(3.6));
console.log(fixValue('3.6'));


function $(seletor: 'a'): HTMLAnchorElement | null;
function $(seletor: 'video'): HTMLVideoElement | null;
function $(seletor: 'string'): Element | null; //permite selecionar uma classe
function $(seletor: string): Element | null {
    return document.querySelector(seletor);
}

$('a')?.href // agora é possivel acessar os atributos