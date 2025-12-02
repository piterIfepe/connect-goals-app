window.onload = function() {
    alert("Bem-vindo à Connect Goals App MVP!");
    carregarObjetivos();
};

document.getElementById("btnAdicionar").onclick = function() {
    const input = document.getElementById("novoObjetivo");
    const categoria = document.getElementById("categoria").value;
    const cidade = document.getElementById("cidade").value.trim();
    const valor = input.value.trim();

    if(valor !== "" && cidade !== "") {
        adicionarObjetivo(valor, categoria, cidade);
        input.value = "";
        // Não limpa o campo cidade para permitir múltiplos objetivos na mesma cidade
    } else {
        alert("Digite um objetivo e a cidade antes de adicionar!");
    }
};

function adicionarObjetivo(objetivo, categoria, cidade) {
    const li = document.createElement("li");
    li.textContent = `${objetivo} (${cidade})`;
    li.classList.add(categoria);

    // Botão remover
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.classList.add("btnRemover");
    btnRemover.onclick = function() {
        li.remove();
        removerObjetivo(objetivo, cidade);
    };

    // Botão editar
    const btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.classList.add("btnEditar");
    btnEditar.onclick = function() {
        const novoTexto = prompt("Edite seu objetivo:", objetivo);
        if(novoTexto !== null && novoTexto.trim() !== "") {
            li.firstChild.textContent = `${novoTexto} (${cidade})`;
            atualizarObjetivo(objetivo, novoTexto, cidade);
            objetivo = novoTexto; // Atualiza variável para remover depois
        }
    };

    li.appendChild(btnRemover);
    li.appendChild(btnEditar);
    document.getElementById("listaObjetivos").appendChild(li);

    // Salvar no localStorage
    let objetivos = JSON.parse(localStorage.getItem("objetivos")) || [];
    objetivos.push({texto: objetivo, categoria: categoria, cidade: cidade});
    localStorage.setItem("objetivos", JSON.stringify(objetivos));
}

function carregarObjetivos() {
    let objetivos = JSON.parse(localStorage.getItem("objetivos")) || [];
    const lista = document.getElementById("listaObjetivos");
    lista.innerHTML = "";

    const cidadeAtual = prompt("Digite sua cidade para ver os objetivos:");
    
    objetivos
        .filter(o => o.cidade.toLowerCase() === cidadeAtual.toLowerCase())
        .forEach(function(o) {
            adicionarObjetivo(o.texto, o.categoria, o.cidade);
        });
}

function removerObjetivo(objetivo, cidade) {
    let objetivos = JSON.parse(localStorage.getItem("objetivos")) || [];
    objetivos = objetivos.filter(o => !(o.texto === objetivo && o.cidade === cidade));
    localStorage.setItem("objetivos", JSON.stringify(objetivos));
}

function atualizarObjetivo(oldText, newText, cidade) {
    let objetivos = JSON.parse(localStorage.getItem("objetivos")) || [];
    objetivos = objetivos.map(o => o.texto === oldText && o.cidade === cidade ? {...o, texto: newText} : o);
    localStorage.setItem("objetivos", JSON.stringify(objetivos));
}
