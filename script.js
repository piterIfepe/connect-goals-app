// Armazenando dados no LocalStorage
const objetivos = JSON.parse(localStorage.getItem('objetivos')) || [];

// Função para atualizar a lista de objetivos
function atualizarLista() {
  const cidadeInput = document.getElementById('cidade').value.toLowerCase();
  const lista = document.getElementById('listaObjetivos');
  
  // Limpar a lista atual
  lista.innerHTML = '';

  // Filtrando e exibindo objetivos que correspondem à cidade
  objetivos.filter(obj => obj.cidade.toLowerCase().includes(cidadeInput)).forEach(obj => {
    const li = document.createElement('li');
    li.classList.add(obj.categoria);
    li.innerHTML = `
      <span>${obj.nome}</span>
      <div>
        <button onclick="removerObjetivo('${obj.nome}')">Remover</button>
        <button onclick="editarObjetivo('${obj.nome}')">Editar</button>
      </div>
    `;
    lista.appendChild(li);
  });
}

// Função para adicionar objetivo
function adicionarObjetivo() {
  const objetivoInput = document.getElementById('objetivo').value;
  const categoriaInput = document.getElementById('categoria').value;
  const cidadeInput = document.getElementById('cidade').value;

  if (!objetivoInput || !categoriaInput || !cidadeInput) {
    alert('Preencha todos os campos!');
    return;
  }

  // Adicionando novo objetivo
  const novoObjetivo = {
    nome: objetivoInput,
    categoria: categoriaInput,
    cidade: cidadeInput
  };

  objetivos.push(novoObjetivo);
  localStorage.setItem('objetivos', JSON.stringify(objetivos));
  
  // Limpar campos
  document.getElementById('objetivo').value = '';
  document.getElementById('categoria').value = '';
  document.getElementById('cidade').value = '';

  atualizarLista(); // Atualizar a lista
}

// Função para remover objetivo
function removerObjetivo(nome) {
  const index = objetivos.findIndex(obj => obj.nome === nome);
  if (index !== -1) {
    objetivos.splice(index, 1);
    localStorage.setItem('objetivos', JSON.stringify(objetivos));
    atualizarLista();
  }
}

// Função para editar objetivo (simples prompt para alteração de nome)
function editarObjetivo(nome) {
  const novoNome = prompt('Edite o nome do objetivo:', nome);
  if (novoNome) {
    const objetivo = objetivos.find(obj => obj.nome === nome);
    objetivo.nome = novoNome;
    localStorage.setItem('objetivos', JSON.stringify(objetivos));
    atualizarLista();
  }
}

// Inicialização da lista ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  atualizarLista();

  // Atualizar automaticamente ao digitar na cidade
  document.getElementById('cidade').addEventListener('input', atualizarLista);

  // Adicionar objetivo ao clicar no botão
  document.getElementById('adicionarBtn').addEventListener('click', adicionarObjetivo);
});
