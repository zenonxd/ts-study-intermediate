# About

Parte 2 do curso de Typescript da Origamid, lecionado pelo André Rafael.

Agora, entraremos mais em objetos, interfaces, DOM, generics, funções, etc.

Caso tenha alguma dúvida, recorra à [Parte 1]() do estudo.

# class

Em JavaScript, Classes ``class`` são funções construtoras que geram objetos. Quando nós definimos uma classe, o TypeScript
gera a interface do objeto produzido pela mesma.

```javascript
class Produto {
  nome: string;
  preco: number;
  
  constructor(nome: string, preco: number) {
    this.nome = nome;
    this.preco = preco;
  }
  precoReal() {
    return `R$ ${this.preco}`;
  }
}

const livro = new Produto('A Guerra dos Tronos', 200);
```

# instanceOf

Existem funções que retornam diferentes tipos de objetos. Com a palavra-chave ``instanceof`` podemos verificar se um
objeto é uma instância, ou seja, se ele foi construído -ou herda- de uma função construtora (class).

```java
class Livro {
    autor: string;

    constructor(autor: string) {
        this.autor = autor;
    }
}

class Jogo {
    jogadores: number;


    constructor(jogadores: number) {
        this.jogadores = jogadores;
    }
}

function buscarProduto(busca: string) {
    if (busca === 'O hobbit') {
        return new Livro('J. R. R. Tolkien')
    }

    if (busca === 'Dark Souls') {
        return new Jogo(1);
    }

    return null
}

const produto = buscarProduto('O hobbit');

if (produto instanceof Livro) {
produto.autor;
}
```

## extends (herança)

O JavaScript também trabalha muito com a questão de herança. Portanto, um objeto pode extender o objeto anterior, herdando
suas características.

O instanceof também verifica essa herdança.

Abaixo, é o mesmo exemplo de acima. Criamos uma classe Produto que possui um nome do tipo String.

Eventuais classes podem extender essa classe e herdaram o ``nome: string;``, podendo ser ainda, adicionado outros
atributos.

```javascript
class Produto {
    nome: string;

    constructor(nome: string) {
        this.nome = nome;
    }
}

class Livro extends Produto {
    autor: string;
    
    constructor(nome: string, autor: string) {
        super(nome);
        
        this.autor = autor;
    }
}

class Jogo extends Produto {
    jogadores: number;

    constructor(nome: string, jogadores: number) {
        super(nome);
        this.jogadores = jogadores;
    }
}

function buscarProduto(busca: string) {
    if (busca === 'O hobbit') {
        return new Livro('O Hobbit', 'J. R. R. Tolkien');
    }

    if (busca === 'Dark Souls') {
        return new Jogo('Dark Souls', 1);
    }

    return null;
}

const produto1 = buscarProduto('O hobbit');
const produto2 = buscarProduto('Dark Souls');

//antes verificávamos se as constantes eram intancia da classe em sí. Agora, podemos verificar se ela são instâncias
//da classe sendo extendida (Produto)

if (produto1 instanceof Produto) {
    produto1.nome;
}

if (produto2 instanceof Jogo) {
    produto2.nome;
}
```

## Instanceof e interface (não funciona)

O ``instanceof`` é um operador que existe no JavaScript. Se por ventura, você definir uma ``interface`` de um objeto apenas
como ``interface`` e não possuir uma classe construtora do mesmo, não é possível utilizar ``instanceof``.

```javascript
const jogo: Produto = {
  nome: 'Dark Souls',
};

// Erro
if (jogo instanceof Produto) {
}
```

# Interfaces do DOOM

Relembrando algumas interfaces do DOOM.

- [QuerySelector]
- [Como saber os retornos de objeto do DOM?]
- [QuerySelectorAll]

## querySelector

Quando selecionamos um elemento do DOM com o querySelector, o objeto retornado dependerá da string que passarmos
no método.

No exemplo abaixo, somente com o querySelector, ele irá retornar um HTMLVideoElement, ImageElement, Anchor ou um
próprio HTMLElement.

```javascript
document.querySelector('video'); // HTMLVideoElement
document.querySelector('img'); // HTMLImageElement

const link1 = document.querySelector('a'); // HTMLAnchorElement
const link2 = document.querySelector('#origamid'); // Element

link1?.href;
link2?.href; // erro no ts
```

**❗IMPORTANTE: para que nunca tenha nenhum erro, para que sempre nosso código SAIBA o que estamos acessando, sempre
manipule verificando se o elemento em questão é um "instanceof X coisa", para que assim, seja possível acessar
seus métodos.**

## Como saber os possíveis objetos que o DOM pode retornar?

Só existe uma maneira, lendo a documentação, [essa, por exemplo.](https://developer.mozilla.org/en-US/docs/Web/API)

Entretanto, o link possui diversas API disponíveis para serem manipuladas. A forma correta, é a gente identificar qual
estamos manipulando, procurar no site, acessar o documento e ler as suas propriedades.

### Exemplo: HTMLAnchorElement

Imagine que estamos manipulando um elemento do tipo [HTMLAnchorElement.](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAnchorElement)

![img.png](img.png)

Como podemos observar na documentação, um HTMLAnchorElement, possuirá tudo que um: HTMLElement possui, Element, Node e
por sua vez, um EventTarget.

Tudo isso porque esse HTMLAnchorElement extends HTMLElement.

## querySelectorAll

Retorna uma NodeList de elementos. Não confundir o nome da interface ``NodeListOf`` com o nome da classe ``NodeList``.

Vamos ao exemplo!

```html
<a class="link" href="/">Home</a>
<a class="link" href="/produtos">Produtos</a>
<button class="link">Login</button>
```

Temos dois links com a classe link e um buttom com a mesma classe.

Ao selecionar todos os elementos com a classe ``.link``, olha o que ele retorna, uma ``NodeListOf<Element>``.

![img_1.png](img_1.png)

**Entenda: isso NÃO é uma Array. É uma NodeList, e o que está dentro dela são itens do tipo Element.**

### O que podemos fazer com NodeList?

Podemos, por exemplo, utilizar um forEach! Passando uma função de callback para cada elemento dentro dessa NodeList.

Filter, por exemplo, não funcionaria, pois é uma NodeList e não uma Array.

Só funcionaria se transformássemos essa NodeList em Array com ``ArrayFrom``.

```typescript
const links = document.querySelectorAll('.link')

links.forEach((link) => {
    if (link instanceof HTMLAnchorElement) {
        console.log(link.href)
    } else {
        //typeof vai retornar SEMPRE objeto.
        console.log(typeof link);
    }
});

// erro, filter é um método de Array e não de NodeList
const anchorLinks = links.filter((link) => { link instanceof HTMLAnchorElement});

// Agora sim irá funcionar, pois é uma Array.
const arrayLinks = Array.from(links);

arrayLinks.filter((link) => {
    return link instanceof HTMLAnchorElement;
})
```

## Exercício:

1 - Selecione os elementos com a classe link.

2 - Crie uma função que deve ser executada para cada elemento.

3 - Modificar através da função o estilo da color e border.

```html
<a class="link" href="/">Home</a>
<a class="link" href="/produtos">Produtos</a>
<button class="link">Login</button>
```

### Resolução:

```typescript
const links = document.querySelectorAll('.link');

function execForEachLink(elements: NodeListOf<Element>) {

    elements.forEach((link) => {

        //usamos HTMLElement para também selecionar o botão.
        //se usássemos HTMLAnchorElement, pegaria só os links.
        if (link instanceof HTMLElement) {
            link.style.border = '2px solid blue';
        }
    })
}

execForEachLink(links);
```



# Eventos e Callback