


async function getData<T>(url: string): Promise<T> {
    const response = await fetch(url);

    return await response.json();
}

interface Notebook {
    nome: string;
    preco: number;
}

async function handleData() {
    const notebook = await getData<Notebook>(
        "https://api.origamid.dev/json/notebook.json"
    );
    console.log(notebook);
}

handleData();