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
        const li = document.createElement("li");
        li.textContent = objetivo;
        lista.appendChild(li);
    });
}
