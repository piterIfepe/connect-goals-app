window.onload = function() {
    alert("Bem-vindo à Connect Goals App MVP!");
    carregarObjetivos();
};

document.getElementById("btnAdicionar").onclick = function() {
    const input = document.getElementById("novoObjetivo");
    const categoria = document.getElementById("categoria").value;
    const valor = input.value.trim();

    if(valor !== "") {
        adicionarObjetivo(valor, categoria);
        input.value = "";
    } else {
        alert("Digite um objetivo antes de adicionar!");
    }
};

function adicionarObjetivo(objetivo, categoria) {
    const li = document.createElement("li");
    li.textContent = objetivo;
    li.classList.add(categoria);

    // Botão remover
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.classList.add("btnRemover");
    btnRemover.onclick = function() {
        li.remove();
        removerObjetivo(objetivo);
    };

    // Botão editar
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("btnEditar");
    btnEditar.onclick = function() {
        const novoTexto = prompt("Edite seu objetivo:", objetivo);
        if(novoTexto !== null && novoTexto.trim() !== "") {
            li.firstChild.textContent = novoTexto;
            atualizarObjetivo(objetivo, novoTexto);
            objetivo = novoTexto; // Atualiza variável para remover depois
        }
    };

    li.appendChild(btnRemover);
    li.appendChild(btnEditar);
    document.getElementById("listaObjetivos").appendChild(li);

    // Salvar no localStorage
    let objetivos = JSON.parse(localStorage.getItem("objetivos")) || [];
    objetivos.push({texto: objetivo, categoria: categoria});
    localStorage.setItem("objetivos", JSON.stringify(objetivos));
}

function carregarObjetivos() {
    let objetivos = JSON.parse(localStorage.getItem("objetivos")) || [];
    const lista = document.getElementById("listaObjetivos");
    lista.innerHTML = "";

    objetivos.forEach(function(o) {
        adicionarObjetivo(o.texto, o.categoria);
    });
}

function removerObjetivo(objetivo) {
    let objetivos = JSON.parse(localStorage.getItem("objetivos")) || [];
    objetivos = objetivos.filter(o => o.texto !== objetivo);
    localStorage.setItem("objetivos", JSON.stringify(objetivos));
}

function atualizarObjetivo(oldText, newText) {
    let objetivos = JSON.parse(localStorage.getItem("objetivos")) || [];
    objetivos = objetivos.map(o => o.texto === oldText ? {...o, texto: newText} : o);
    localStorage.setItem("objetivos", JSON.stringify(objetivos));
}
