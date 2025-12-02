// Alerta de boas-vindas
window.onload = function() {
    alert("Bem-vindo à Connect Goals App MVP!");
    carregarObjetivos(); // Carrega objetivos salvos ao iniciar
};

// Botão adicionar objetivo
document.getElementById("btnAdicionar").onclick = function() {
    const input = document.getElementById("novoObjetivo");
    const valor = input.value.trim();

    if(valor !== "") {
        adicionarObjetivo(valor);
        input.value = ""; // limpa o input
    } else {
        alert("Digite um objetivo antes de adicionar!");
    }
};

// Função para adicionar objetivo à lista e salvar
function adicionarObjetivo(objetivo) {
    const li = document.createElement("li");
    
    li.textContent = objetivo;

    // Criar botão de remover
    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Remover";
    btnRemover.classList.add("btnRemover");
    btnRemover.onclick = function() {
        li.remove();
        removerObjetivo(objetivo);
    };

    li.appendChild(btnRemover);
    document.getElementById("listaObjetivos").appendChild(li);

    // Salvar no localStorage
    let objetivos = JSON.parse(localStorage.getItem("objetivos")) || [];
    objetivos.push(objetivo);
    localStorage.setItem("objetivos", JSON.stringify(objetivos));
}

// Função para carregar objetivos salvos
function carregarObjetivos() {
    let objetivos = JSON.parse(localStorage.getItem("objetivos")) || [];
    const lista = document.getElementById("listaObjetivos");
    lista.innerHTML = ""; // limpa lista antes de carregar

    objetivos.forEach(function(objetivo) {
        adicionarObjetivo(objetivo);
    });
}

// Função para remover objetivo do localStorage
function removerObjetivo(objetivo) {
    let objetivos = JSON.parse(localStorage.getItem("objetivos")) || [];
    objetivos = objetivos.filter(o => o !== objetivo);
    localStorage.setItem("objetivos", JSON.stringify(objetivos));
}
