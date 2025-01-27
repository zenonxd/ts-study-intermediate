

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