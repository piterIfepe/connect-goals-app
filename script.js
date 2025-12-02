// Alerta de boas-vindas
window.onload = function() {
    alert("Bem-vindo à Connect Goals App MVP!");
};

// Botão adicionar objetivo
document.getElementById("btnAdicionar").onclick = function() {
    const input = document.getElementById("novoObjetivo");
    const valor = input.value.trim();

    if(valor !== "") {
        const li = document.createElement("li");
        li.textContent = valor;
        document.getElementById("listaObjetivos").appendChild(li);
        input.value = ""; // limpa o input
    } else {
        alert("Digite um objetivo antes de adicionar!");
    }
};
